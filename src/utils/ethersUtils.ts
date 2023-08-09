import { ethers } from 'ethers'
import { USDC_TOKEN, CHAIN_ID } from './consts'
import { ERC20_ABI } from './consts'

const getAccount = async () => {
	let value = await window.ethereum.request({
		method: 'eth_requestAccounts',
	})
	await changeNetwork()
	return value
}

const changeNetwork = async () => {
	if (window.ethereum) {
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: CHAIN_ID }],
			})
		} catch (error) {
			// This error code indicates that the chain has not been added to MetaMask
			console.log(error)
		}
	}
}

export const getSignerAddress = async () => {
	const signerAddressArray = await getAccount()
	let signerAddress = await signerAddressArray[0]
	return signerAddress
}

export const isValidAddress = (receiversAddress: any) => {
	try {
		ethers.utils.getAddress(receiversAddress)
		return true
	} catch (error) {
		return false
	}
}

export const getBalance = async () => {
	try {
		const address = await getSignerAddress()
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const balance = await provider.getBalance(address)
		const balanceInEther = ethers.utils.formatEther(balance)
		return balanceInEther
	} catch (error) {
		console.log('Error getting Ether balance:', error)
		return null
	}
}

export const getUSDCBalance = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const signer = provider.getSigner()
	let tokenContract = new ethers.Contract(USDC_TOKEN.address, ERC20_ABI, signer)
	const signerAdd = await signer.getAddress()
	const balance = await tokenContract.balanceOf(signerAdd)
	const balanceInWei = balance.toString()
	const balanceInDecimals = ethers.utils.formatEther(balanceInWei)
	return balanceInDecimals.slice(0, 7)
}

export const getGasPrice = async () => {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const gasPrice = await provider.getGasPrice()
		const gasPriceInWei = gasPrice.toString()
		const gasPriceInGwei = ethers.utils.formatUnits(gasPriceInWei, 'gwei')
		return gasPriceInGwei
	} catch (error) {
		console.log('Error fetching gas price:', error)
		return null
	}
}
