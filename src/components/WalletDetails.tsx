import React, { useContext } from 'react'
import { Col, Row } from 'reactstrap'
import { WalletContext } from '../context/AppContext'

const WalletDetails = () => {
	const { address, tokenBal, bal } = useContext(WalletContext)
	let trimmedAddress: any
	if (address) {
		trimmedAddress = address.substring(0, 4) + '...' + address.substring(address.length - 7, address.length)
	}
	return (
		<>
			<Row>
				<Col sm={6} className="heading">
					Account:
				</Col>
				<Col sm={6} className="value">
					{address}
				</Col>
			</Row>
			<Row>
				<Col sm={6} className="heading">
					Ether Balance:
				</Col>
				<Col sm={6} className="value">
					{bal}
				</Col>
			</Row>
			<Row>
				<Col sm={6} className="heading">
					USDC Balance:
				</Col>
				<Col sm={6} className="value">
					{tokenBal}
				</Col>
			</Row>
		</>
	)
}

export default WalletDetails
