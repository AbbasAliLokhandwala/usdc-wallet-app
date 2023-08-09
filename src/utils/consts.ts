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
	address: '0x1Ee0B336Ec36Dc260239D40d245d51fe04EE1355',
}

export const CHAIN_ID = '0x5'
