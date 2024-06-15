'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { AuthProvider, AuthProviderProps } from 'oidc-react';
import { baseSepolia } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { createWagmiConfig } from '@/store/createWagmiConfig';
import { SIWEProvider } from '@/hooks/useSIWE';
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

function Providers({ children }: Props) {
  return (
    <Theme
      appearance='dark'
      radius="none"
    >
      <OnchainProviders>
        <SIWEProvider>
          {children}
        </SIWEProvider>
      </OnchainProviders>
    </Theme>
  );
}

export default Providers;
