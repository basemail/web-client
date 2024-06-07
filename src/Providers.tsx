'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, AuthProviderProps } from 'oidc-react';
import { baseSepolia } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { createWagmiConfig } from '@/store/createWagmiConfig';

// TODO control with environment variables
const oidcConfig: AuthProviderProps = {
  authority: 'https://siwe-oidc-production.up.railway.app',
  clientId: 'TODO-get-a-client-id',
  redirectUri: 'http://localhost:3000',
};

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const rpcUrl = '/api/rpc';

const wagmiConfig = createWagmiConfig(rpcUrl);

function OnchainProviders({ children }: Props) {
  return (
    <AuthProvider {...oidcConfig}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider chain={baseSepolia}>{children}</OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AuthProvider>
  );
}

export default OnchainProviders;
