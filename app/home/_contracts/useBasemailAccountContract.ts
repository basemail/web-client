import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import { abi } from './BasemailAccountABI';

export const useBasemailAccountContract = generateContractHook({
  abi: abi,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0xBdB578684B46ef9FdB669A49c2d19E2F96d7920F',
  },
});
