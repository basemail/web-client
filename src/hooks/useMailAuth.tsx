import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { JWTPair, JWTPairFromJSON } from '@/gen';

// Mail auth api
import * as runtime from '../gen/runtime';
import { useSIWE } from './useSIWE';

type AuthCode = {
  code?: string;
  isAdmin?: boolean;
}

function AuthCodeFromJSONTyped(json: unknown, ignoreDiscriminator: boolean): AuthCode {
  if (json == null) {
    return json;
  }
  return {
    code: json.code == null ? undefined : json.code,
    isAdmin: json.isAdmin == null ? undefined : json.isAdmin,
  };
}

function AuthCodeFromJSON(json: unknown): AuthCode {
  return AuthCodeFromJSONTyped(json, false);
}



type AuthCodePostRequest = {
  username: string;
  password: string;
}

type AuthTokenPostRequest = {
  code: string;
}

class MailAuthApi extends runtime.BaseAPI {
  async authCodePostRaw(
    requestParameters: AuthCodePostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<AuthCode>> {
    if (requestParameters.username == null) {
      throw new runtime.RequiredError(
        'username',
        'Required parameter "username" was null or undefined when calling authCodePost.',
      );
    }

    if (requestParameters.password == null) {
      throw new runtime.RequiredError(
        'password',
        'Required parameter "password" was null or undefined when calling authCodePost.',
      );
    }

    const queryParameters: unknown = {};

    const credentials = btoa(`${requestParameters.username}:${requestParameters.password}`);

    const headerParameters: runtime.HTTPHeaders = {
      Authorization: `Basic ${credentials}`,
    };

    const body = {
      client_id: 'basemail_web_client',
      redirect_uri: 'https://basechain.email',
      type: 'Code',
    };

    const response = await this.request(
      {
        path: `/authorize/code`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: body,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => AuthCodeFromJSON(jsonValue));
  }

  async authCodePost(
    requestParameters: AuthCodePostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<AuthCode> {
    const response = await this.authCodePostRaw(requestParameters, initOverrides);
    return response.value();
  }

  async authTokenPostRaw(
    requestParameters: AuthTokenPostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<JWTPair>> {
    if (requestParameters.code == null) {
      throw new runtime.RequiredError(
        'code',
        'Required parameter "code" was null or undefined when calling authTokenPost.',
      );
    }

    const queryParameters: unknown = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const body: FormData = new FormData();
    body.append('client_id', 'basemail_web_client');
    body.append('redirect_uri', 'https://basechain.email');
    body.append('grant_type', 'authorization_code');
    body.append('code', requestParameters.code);

    const response = await this.request(
      {
        path: '/auth/token',
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: body,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => JWTPairFromJSON(jsonValue));
  }

  async authTokenPost(
    requestParameters: AuthTokenPostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<JWTPair> {
    const response = await this.authTokenPostRaw(requestParameters, initOverrides);
    return response.value();
  }
}

// Mail auth context
type MailAuthContextState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (accountId: string) => void;
  getAccessToken: () => string | undefined;
};

const initialState = {} as MailAuthContextState;
export const MailAuthContext = createContext<MailAuthContextState>(initialState);

export const useMailAuth = () => {
  return useContext(MailAuthContext);
};

export function MailAuthProvider({ children }: { children: React.ReactNode }) {
  // We expect there to be siwe context available
  const { getAccessToken: getSIWEToken } = useSIWE();

  // Track loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cookies = useCookies();

  // Simple storage for auth tokens
  const TokenStorage = {
    getAccessToken: () => cookies.get('mail_access_token'),
    getRefreshToken: () => cookies.get('mail_refresh_token'),
    setAccessToken: (token: string) => cookies.set('mail_access_token', token),
    setRefreshToken: (token: string) => cookies.set('mail_refresh_token', token),
  };

  // Clear tokens when the address changes
  useEffect(() => {
    if (TokenStorage.getAccessToken() || TokenStorage.getRefreshToken()) {
      TokenStorage.setAccessToken('');
      TokenStorage.setRefreshToken('');
    }
  }, [getSIWEToken()]);

  // Create an auth api client
  const authApi = new MailAuthApi({
    ...runtime.DefaultConfig,
    basePath: 'https://localhost:8080',
  } as runtime.Configuration);

  async function signIn(accountId: string) {
    // 1. Get the SIWE token to use as the auth password
    const siweToken = getSIWEToken();

    // 2. Sign in to get authorization code from the mail server's OAuth provider
    const authCode = await authApi.authCodePost({
      username: accountId,
      password: siweToken!,
    });

    // 3. Use the auth code to get access and refresh tokens
    try {
      const response = await authApi.authTokenPost({
        code: authCode?.code!,
      });

      TokenStorage.setAccessToken(response?.accessToken!);
      TokenStorage.setRefreshToken(response?.refreshToken!);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  // TODO - Implement a refresh token flow
  return (
    <MailAuthContext.Provider
      value={{
        isLoading,
        isAuthenticated: !!TokenStorage.getAccessToken(),
        signIn,
        getAccessToken: TokenStorage.getAccessToken,
      }}
    >
      {children}
    </MailAuthContext.Provider>
  );
}
