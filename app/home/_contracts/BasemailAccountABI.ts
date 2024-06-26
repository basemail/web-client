export const abi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
    outputs: [{ name: 'result', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'changeUsername',
    inputs: [
      { name: 'oldUsername_', type: 'string', internalType: 'string' },
      { name: 'newUsername_', type: 'string', internalType: 'string' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createAccount',
    inputs: [
      { name: 'to_', type: 'address', internalType: 'address' },
      { name: 'username_', type: 'string', internalType: 'string' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deleteAccount',
    inputs: [{ name: 'accountId_', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getAccountId',
    inputs: [{ name: 'username_', type: 'string', internalType: 'string' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAccounts',
    inputs: [{ name: 'holder_', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256[]', internalType: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getApproved',
    inputs: [{ name: 'id', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: 'result', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getUsername',
    inputs: [{ name: 'accountId_', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getUsernames',
    inputs: [{ name: 'holder_', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'string[]', internalType: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'holderAccounts',
    inputs: [
      { name: 'holder', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: 'accounts', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'idCounter',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'idToName',
    inputs: [{ name: 'accountId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: 'username', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: 'operator', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'locked',
    inputs: [{ name: 'id', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'nameToId',
    inputs: [{ name: 'username', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: 'accountId', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownerOf',
    inputs: [{ name: 'id', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: 'result', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'bool', internalType: 'bool' },
    ],
    outputs: [],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [{ name: 'interfaceId', type: 'bytes4', internalType: 'bytes4' }],
    outputs: [{ name: 'result', type: 'bool', internalType: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'tokenURI',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'transferUsername',
    inputs: [
      { name: 'to_', type: 'address', internalType: 'address' },
      { name: 'usernameToTransfer_', type: 'string', internalType: 'string' },
      { name: 'newUsername_', type: 'string', internalType: 'string' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'AccountCreated',
    inputs: [
      { name: 'accountId', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'to', type: 'address', indexed: false, internalType: 'address' },
      { name: 'username', type: 'string', indexed: false, internalType: 'string' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'AccountDeleted',
    inputs: [{ name: 'accountId', type: 'uint256', indexed: false, internalType: 'uint256' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      { name: 'owner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'account', type: 'address', indexed: true, internalType: 'address' },
      { name: 'id', type: 'uint256', indexed: true, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      { name: 'owner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'operator', type: 'address', indexed: true, internalType: 'address' },
      { name: 'isApproved', type: 'bool', indexed: false, internalType: 'bool' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { name: 'from', type: 'address', indexed: true, internalType: 'address' },
      { name: 'to', type: 'address', indexed: true, internalType: 'address' },
      { name: 'id', type: 'uint256', indexed: true, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UsernameChanged',
    inputs: [
      { name: 'accountId', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'oldUsername', type: 'string', indexed: false, internalType: 'string' },
      { name: 'newUsername', type: 'string', indexed: false, internalType: 'string' },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'AccountAlreadyExists', inputs: [] },
  { type: 'error', name: 'AccountBalanceOverflow', inputs: [] },
  { type: 'error', name: 'AccountDoesNotExist', inputs: [] },
  { type: 'error', name: 'BalanceQueryForZeroAddress', inputs: [] },
  { type: 'error', name: 'NotOwnerNorApproved', inputs: [] },
  { type: 'error', name: 'OnlyTokenHolder', inputs: [] },
  { type: 'error', name: 'TokenAlreadyExists', inputs: [] },
  { type: 'error', name: 'TokenDoesNotExist', inputs: [] },
  { type: 'error', name: 'TransferFromIncorrectOwner', inputs: [] },
  { type: 'error', name: 'TransferToNonERC721ReceiverImplementer', inputs: [] },
  { type: 'error', name: 'TransferToZeroAddress', inputs: [] },
  { type: 'error', name: 'TransfersDiabled', inputs: [] },
  { type: 'error', name: 'UsernameInvalid', inputs: [] },
] as const;
