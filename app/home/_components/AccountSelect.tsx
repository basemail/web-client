import { useState, useCallback } from 'react';
import { useAccount, useReadContracts, useWriteContract } from 'wagmi';
import Button from '@/components/Button/Button';
import { useBasemailAccountContract } from '../_contracts/useBasemailAccountContract';
import { CallStatus } from './CallStatus';

export function AccountSelect(): JSX.Element {
  const { address, isConnected } = useAccount();
  const contract = useBasemailAccountContract();
  const { data: callID, writeContract } = useWriteContract();

  if (contract.status !== 'ready') {
    throw new Error('Contract not ready');
  }

  // TODO handle pending and error states?
  const { data } = useReadContracts({
    contracts: [
      {
        address: contract.address,
        abi: contract.abi,
        functionName: 'getAccounts',
        args: [address ?? '0x'],
      },
      {
        address: contract.address,
        abi: contract.abi,
        functionName: 'getUsernames',
        args: [address ?? '0x'],
      },
    ],
    query: { enabled: isConnected && contract.status === 'ready' },
  });

  const [{ result: accountIds }, { result: usernames }] = data ?? [{ result: [] }, { result: [] }];

  const accounts = Array.from({ length: accountIds.length }, (_, i) => ({
    id: accountIds[i].toString(),
    username: usernames[i].toString(),
  }));

  const [username, setUsername] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<string>('new');

  const onCreateAccount = useCallback(() => {
    writeContract({
      address: contract.address,
      abi: contract.abi,
      functionName: 'createAccount',
      args: [address ?? '0x', username],
    });
  }, [contract, address, username, writeContract]);

  const handleEnterApp = () => {
    // TODO send Basic auth credentials to mail-server, set mailAccessToken and mailRefreshToken in session storage, and redirect to /mail
    
  }

  // TODO show loading state before the accounts are fetched instead of defaulting to create new account
  return (
    <div className="w-48 text-center">
      <select className="my-4 text-lg" onChange={(e) => setSelectedAccount(e.target.value)} value={selectedAccount}>
        {(accounts?.length ?? 0) > 0 &&
          accounts?.map(({ id, username }) => (
            <option key={id} value={id}>
              {username}@basechain.email
            </option>
          ))}
        <option value="new">Create New Account</option>
      </select>
      {selectedAccount === 'new' ? (
        <div>
          <h4>Username</h4>
          <input
            className="my-2 border"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            buttonContent={<h2 className="text-lg">Submit</h2>}
            className="my-4 w-32"
            onClick={onCreateAccount}
          />
          {callID && <CallStatus id={callID} />}
        </div>
      ) : (
        <Button
          buttonContent={<h2 className="text-lg">Open</h2>}
          className="my-4 w-32"
          onClick={handleEnterApp}
        />
      )}
    </div>
  );
}

export default AccountSelect;
