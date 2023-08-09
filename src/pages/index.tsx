import { FC } from 'react'
import { WalletProvider } from '../context/AppContext'
import App from './app'

const Home: FC = () => {
	return (
		<WalletProvider>
			<App />
		</WalletProvider>
	)
}

export default Home
