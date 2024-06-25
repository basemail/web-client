import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { SiweMessage } from 'siwe';
import { useAccount, useSignMessage, useChainId } from 'wagmi';
import { AuthenticationApi, SigninData } from '@/gen';

// SIWE context
type SIWEContextState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => void;
  getAccessToken: () => string | undefined;
};

const initialState = {} as SIWEContextState;
export const SIWEContext = createContext<SIWEContextState>(initialState);

export const useSIWE = () => {
  return useContext(SIWEContext);
};

export function SIWEProvider({ children }: { children: React.ReactNode }) {
  // We expect there to be onchain context available
  const { address } = useAccount();
  const chainId = useChainId();

  // Track loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cookies = useCookies();

  // Simple storage for auth tokens
  const TokenStorage = {
    getAccessToken: () => cookies.get('siwe_access_token'),
    getRefreshToken: () => cookies.get('siwe_refresh_token'),
    setAccessToken: (token: string) => cookies.set('siwe_access_token', token),
    setRefreshToken: (token: string) => cookies.set('siwe_refresh_token', token),
  };

  // Clear tokens when the address changes
  useEffect(() => {
    if (TokenStorage.getAccessToken() || TokenStorage.getRefreshToken()) {
      TokenStorage.setAccessToken('');
      TokenStorage.setRefreshToken('');
    }
  }, [address]);

  // Create an auth api client
  const authApi = new AuthenticationApi();

  const { signMessageAsync } = useSignMessage();

  async function signAuthMessage(): Promise<{ message: string; signature: string }> {
    const domain = window.location.host;
    const origin = window.location.origin;
    const statement = `You must login with your Smart Wallet to authenticate with the offchain mail service.`;

    // 1. Get a nonce from the api
    let nonce = '';
    try {
      nonce = await authApi.nonceGet();
    } catch (e) {
      console.error(e);
      return { message: '', signature: '' };
    }

    // 2. Create a message
    const rawMessage = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId,
      nonce,
    });

    const message = rawMessage.prepareMessage();

    // 3. Prompt the user to sign the message
    const signature = await signMessageAsync({ account: address, message });

    // 4. Return the message and signature
    return { message, signature };
  }

  async function signIn() {
    // 1. Sign the message
    setIsLoading(true);
    const { message, signature } = await signAuthMessage();

    // 2. Create the sign-in payload
    const signinData = {
      message,
      signature,
    } as SigninData;

    // 3. Send the sign-in request and determine auth status
    try {
      const response = await authApi.signInPost({
        signinData,
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
    <SIWEContext.Provider
      value={{
        isLoading,
        isAuthenticated: !!TokenStorage.getAccessToken(),
        signIn,
        getAccessToken: TokenStorage.getAccessToken,
      }}
    >
      {children}
    </SIWEContext.Provider>
  );
}
