import React, { useContext } from 'react'
import { Button, Card, CardBody } from 'reactstrap'
import { WalletContext, WalletContextType } from '../context/WalletContext'

const ConnectWallet = () => {
	const { connectWallet } = useContext<WalletContextType>(WalletContext)
	console.log('Connected')

	return (
		<Card style={{ width: '400px', margin: 'auto' }}>
			<CardBody>
				<Button onClick={() => connectWallet()} size="md" color="primary" block>
					Connect Wallet
				</Button>
			</CardBody>
		</Card>
	)
}

export default ConnectWallet
