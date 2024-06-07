'use client';
import { useAccount, useSignMessage } from 'wagmi';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import AccountConnect from '@/components/layout/header/AccountConnect';
import Button from '@/components/Button/Button';
import { useSIWE } from '@/hooks/useSIWE';
import { zeroAddress } from 'viem';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  const account = useAccount();

  // const loginMessage = useSIWE(account.address ?? zeroAddress, account.chainId ?? 0);
  // const sign = useSignMessage();

  // const onLogin = () => sign.signMessage({ message: loginMessage });
  const onLogin = () => console.log('login');

  return (
    <>
      <Header />
      <main className="container mx-auto px-8 py-16">
        {account.isConnected ? (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl bold">b m</h1>
          <br />
          <Button buttonContent={<h2 className="text-lg">Login</h2>} className="w-40 my-8" onClick={onLogin} />
          <p className="text-center w-48">Login with your smart wallet to authenticate with the offchain mail service.</p>
        </div>) : (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl bold">b m</h1>
          <br />
          <p className="text-center w-48 py-4">
            To use this application, you need a Smart Wallet.
          </p>
          <p className="text-center w-48 pb-4">Connect your existing one or create one by clicking Connect Wallet.</p>
          <AccountConnect />
        </div>
        )}
      </main>
      <Footer />
    </>
  );
}
