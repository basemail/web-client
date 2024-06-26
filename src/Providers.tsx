'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { AuthProvider, AuthProviderProps } from 'oidc-react';
import { baseSepolia } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { SIWEProvider } from '@/hooks/useSIWE';
import { createWagmiConfig } from '@/store/createWagmiConfig';
import { MailProvider } from './hooks/useMail';
import { MailAuthProvider } from './hooks/useMailAuth';
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
    <Theme appearance="dark" radius="none">
      <OnchainProviders>
        <SIWEProvider>
          <MailAuthProvider>
            <MailProvider>{children}</MailProvider>
          </MailAuthProvider>
        </SIWEProvider>
      </OnchainProviders>
    </Theme>
  );
}

export default Providers;
