'use client';
import { useAccount } from 'wagmi';
import { useSIWE } from '@/hooks/useSIWE';
import Button from '@/components/Button/Button';
import Footer from '@/components/layout/footer/Footer';
import AccountConnect from '@/components/layout/header/AccountConnect';
import Header from '@/components/layout/header/Header';
import AccountSelect from './_components/AccountSelect';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  const account = useAccount();
  const siwe = useSIWE();


  return (
    <>
      <Header />
      <main className="container mx-auto px-8 py-16">
        {account.isConnected && siwe.isAuthenticated && (
          <div className="flex flex-col items-center">
            <h1 className="bold text-4xl">b m</h1>
            <br />
            <p className="w-48 py-4 text-center">
              You are connected and authenticated with the offchain mail service.
            </p>
            <p>
              Access token: {siwe.getAccessToken()}
            </p>
            <AccountSelect />
          </div>
        )}
        {account.isConnected && !siwe.isAuthenticated && (
          <div className="flex flex-col items-center">
            <h1 className="bold text-4xl">b m</h1>
            <br />
            <Button
              buttonContent={<h2 className="text-lg">Login</h2>}
              className="my-8 w-40"
              onClick={siwe.signIn}
            />
            <p className="w-48 text-center">
              Login with your smart wallet to authenticate with the offchain mail service.
            </p>
          </div>
        )}
        {!account.isConnected && (
          <div className="flex flex-col items-center">
            <h1 className="bold text-4xl">b m</h1>
            <br />
            <p className="w-48 py-4 text-center">
              To use this application, you need a Smart Wallet.
            </p>
            <p className="w-48 pb-4 text-center">
              Connect your existing one or create one by clicking Connect Wallet.
            </p>
            <AccountConnect />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
