import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { JWTPair, JWTPairFromJSON } from '@/gen';

// Mail auth api
import * as runtime from '../gen/runtime';
import { useSIWE } from './useSIWE';

type AuthCode = {
  code?: string;
  isAdmin?: boolean;
};

function AuthCodeFromJSONTyped(json: { data: {
  code: string,
  is_admin: boolean,
}}, ignoreDiscriminator: boolean): AuthCode {
  console.log(json);
  if (json == null) {
    return json;
  }
  return {
    code: json.data.code == null ? undefined : json.data.code,
    isAdmin: json.data.is_admin == null ? undefined : json.data.is_admin,
  };
}

function AuthCodeFromJSON(json: unknown): AuthCode {
  return AuthCodeFromJSONTyped(json as { data: {
    code: string,
    is_admin: boolean,
  } }, false);
}

type AuthCodePostRequest = {
  username: string;
  password: string;
};

type AuthTokenPostRequest = {
  code: string;
};

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

    const queryParameters = {};

    const credentials = btoa(`${requestParameters.username}:${requestParameters.password}`);

    const headerParameters: runtime.HTTPHeaders = {
      Authorization: `Basic ${credentials}`,
    };

    const body = JSON.stringify({
      client_id: 'test_client',
      redirect_uri: 'https://localhost:3000',
      type: 'Code',
    });

    const response = await this.request(
      {
        path: `/api/oauth`,
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
    return await response.value();
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

    const queryParameters = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const body: FormData = new FormData();
    body.append('client_id', 'test_client');
    body.append('redirect_uri', 'https://localhost:3000');
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
    return await response.value();
  }
}

// Mail auth context
type MailAuthContextState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  accountId?: string | undefined;
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

  // Track loading state and account id
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<string | undefined>();

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
  const config = new runtime.Configuration({
    basePath: process.env.AUTH_API_URL, // TODO update to use environment variable so it's configurable for deployment
  });
  const authApi = new MailAuthApi(config);

  async function signIn(accountId: string) {
    setIsLoading(true);

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

      // 4. Store the tokens and set account ID
      setAccountId(accountId);
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
        accountId,
        signIn,
        getAccessToken: TokenStorage.getAccessToken,
      }}
    >
      {children}
    </MailAuthContext.Provider>
  );
}
