import { createContext, useEffect, useState } from 'react'
import { getUSDCBalance, getSignerAddress, isValidAddress, getBalance } from '../utils/ethersUtils'

export interface WalletContextType {
	address: string | null
	bal: number | null
	tokenBal: number | null
	connectWallet: () => Promise<void>
	disconnectWallet: () => Promise<void>
	fetchBalances: () => Promise<void>
}

export const WalletContext = createContext<WalletContextType>({
	address: null,
	bal: null,
	tokenBal: null,
	connectWallet: async () => {},
	disconnectWallet: async () => {},
	fetchBalances: async () => {},
})

export const WalletProvider = ({ children }) => {
	const [address, setAddress] = useState<any>()
	const [tokenBal, setTokenBal] = useState<any>()
	const [bal, setBal] = useState<any>()

	useEffect(() => {
		const init = async () => {
			try {
				if (window.ethereum && window.ethereum.isMetaMask) {
					const addr = await getSignerAddress()
					const tokenBalance = await getUSDCBalance()
					const balance = await getBalance()
					setBal(balance)
					setTokenBal(tokenBalance)
					setAddress(addr)
				}
			} catch (err) {
				console.log(err)
			}

			if (window.ethereum) {
				window.ethereum.on('accountsChanged', connectWallet)
			}
		}
		init()
	}, [])

	const fetchBalances = async () => {
		if (isValidAddress(address)) {
			const tokenBalance = await getUSDCBalance()
			const balance = await getBalance()
			setBal(balance)
			setTokenBal(tokenBalance)
		}
	}

	const connectWallet = async () => {
		try {
			if (window.ethereum && window.ethereum.isMetaMask) {
				const addr = await getSignerAddress()
				const tokenBalance = await getUSDCBalance()
				const balance = await getBalance()
				setBal(balance)
				setTokenBal(tokenBalance)
				setAddress(addr)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const disconnectWallet = async () => {
		try {
			setAddress(null)
		} catch (err) {
			console.log(err)
		}
	}
	

	return (
		<WalletContext.Provider
			value={{
				address,
				bal,
				tokenBal,
				connectWallet,
				disconnectWallet,
				fetchBalances,
			}}
		>
			{children}
		</WalletContext.Provider>
	)
}
