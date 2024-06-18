import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useBasemailAccountContract } from '../_contracts/useBasemailAccountContract';
import Button from '@/components/Button/Button';
import { useState } from 'react';
import { CallStatus } from './CallStatus';


export const AccountSelect = (): JSX.Element => {
    const { address, isConnected } = useAccount();
    const contract = useBasemailAccountContract();
    const { data: callID, writeContract } = useWriteContract();

    const { data: accounts } = useReadContract({
        address: contract.address ?? '0x',
        abi: contract.abi,
        functionName: 'getAccounts',
        args: [address ?? '0x'],
        query: { enabled: isConnected && contract.status === 'ready' },   
    });

    const [username, setUsername] = useState<string>('');


    console.log('accounts', accounts);
    console.log('contract address', contract.address);

    const onCreateAccount = () => {
        writeContract({
            address: contract.address ?? '0x',
            abi: contract.abi,
            functionName: 'createAccount',
            args: [address ?? '0x', username],
        }); 
    }

    return (
        <div>
            {(accounts?.length ?? 0) > 0 && (
                <div>
                    <p>Select the account you want to use or create a new one</p>
                    <select>
                        {accounts?.map((account: bigint) => (
                            <option key={account.toString()} value={account.toString()}>
                                {account}
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