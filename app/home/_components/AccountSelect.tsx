import { useState, useCallback } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
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

    const { data: accounts } = useReadContract({
        address: contract.address,
        abi: contract.abi,
        functionName: 'getAccounts',
        args: [address ?? '0x'],
        query: { enabled: isConnected && contract.status === 'ready' },   
    });

    const [username, setUsername] = useState<string>('');


    console.log('accounts', accounts);
    console.log('contract address', contract.address);

    const onCreateAccount = useCallback(() => {
        writeContract({
            address: contract.address,
            abi: contract.abi,
            functionName: 'createAccount',
            args: [address ?? '0x', username],
        }); 
    }, [contract, address, username, writeContract]);

    return (
        <div>
            {(accounts?.length ?? 0) > 0 && (
                <div>
                    <p>Select the account you want to use or create a new one</p>
                    <select>
                        {accounts?.map((account: bigint) => (
                            <option key={account.toString()} value={account.toString()}>
                                {account.toString()}
                            </option>
                        ))}
                    </select>
                    <br />
                </div>
            )}
            <h2>Create Account</h2>
            <h4>Username</h4>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Button
              buttonContent={<h2 className="text-lg">Submit</h2>}
              className="my-8 w-40"
              onClick={onCreateAccount}
            />
            {callID && <CallStatus id={callID} />}
        </div>
    );

}

export default AccountSelect;
