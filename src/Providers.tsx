'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, AuthProviderProps } from 'oidc-react';
import { baseSepolia } from 'viem/chains';
import { useAccount, WagmiProvider } from 'wagmi';
import { createWagmiConfig } from '@/store/createWagmiConfig';
// TODO control with environment variables


type Props = { children: ReactNode };

const queryClient = new QueryClient();

const rpcUrl = '/api/rpc';

const wagmiConfig = createWagmiConfig(rpcUrl);

function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider chain={baseSepolia}>{children}</OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function SiweProvider({ children }: Props) {

  const account = useAccount();

  const oidcConfig: AuthProviderProps = {
    authority: 'https://siwe-oidc-production.up.railway.app',
    clientId: 'TODO-get-a-client-id',
    redirectUri: 'http://localhost:3000',
    autoSignIn: account.isConnected,
  };

  return (
    <AuthProvider {...oidcConfig}>
      {children}
    </AuthProvider>
  );
}

function Providers({ children }: Props) {
  return (
    <Theme>
      <OnchainProviders>
        <SiweProvider>
          {children}
        </SiweProvider>
      </OnchainProviders>
    </Theme>
  );
}

export default Providers;
