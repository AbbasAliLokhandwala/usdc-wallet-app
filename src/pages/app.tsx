import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Web3Provider from '@/components/Web3Provider'
import { useContext } from 'react'
import ConnectWallet from '@/components/ConnectWallet'
import { WalletContext } from '@/context/AppContext'
import ConnectedWalletInfo from '@/components/ConnectedInfo'

const App = () => {
	const { address } = useContext(WalletContext)
	console.log(address)
	return (
		<div className="app">
			{!address ? (
				<ConnectWallet />
			) : (
				<>
					<ConnectedWalletInfo />
				</>
			)}
		</div>
	)
}

export default App
