import React, { useContext } from 'react'
import { Button, Card, CardBody } from 'reactstrap'
import { WalletContext } from '../context/AppContext'
import WalletDetails from './WalletDetails'
import TransactionHistoryTable from './TranxTable'
const ConnectedWalletInfo = () => {
	const { disconnectWallet } = useContext(WalletContext)

	return (
		<>
			<Card style={{ width: '400px', fontWeight: 'bold', margin: 'auto' }}>
				<CardBody>
					<WalletDetails />
					<Button color="primary" block onClick={() => disconnectWallet()}>
						Disconnect Wallet
					</Button>
				</CardBody>
				<TransactionHistoryTable />
			</Card>
		</>
	)
}

export default ConnectedWalletInfo
