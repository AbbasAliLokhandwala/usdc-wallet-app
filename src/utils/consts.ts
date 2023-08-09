export const ERC20_ABI = [
	{
		constant: true,
		inputs: [{ name: '_owner', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ name: 'balance', type: 'uint256' }],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
]
export const USDC_TOKEN = {
	name: 'USDC',
	symbol: 'USDC',
	decimal: 18,
	address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
}

export const CHAIN_ID = '0x5'
