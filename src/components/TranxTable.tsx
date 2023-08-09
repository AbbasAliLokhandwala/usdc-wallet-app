import React, { useContext, useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'
// import paginationFactory from "react-bootstrap-table2-paginator";
import formatAddress from '../utils/formatAddress'
import { fetchTransactionList } from '../utils/api'
import { SyncLoader } from 'react-spinners'
import { Button, Input } from 'reactstrap'
import { WalletContext } from '../context/WalletContext'

const columns = [
	{
		dataField: 'timestamp',
		text: 'Date',
	},
	{
		dataField: 'transactionHash',
		text: 'Transaction Hash',
		formatter: (cell: any) => formatAddress(cell),
	},
	{
		dataField: 'from',
		text: 'From',
		formatter: (cell: any) => formatAddress(cell),
	},
	{
		dataField: 'to',
		text: 'To',
		formatter: (cell: any) => formatAddress(cell),
	},
	{
		dataField: 'blockNumber',
		text: 'Block Number',
	},
	{
		dataField: 'value',
		text: 'Value',
		sort: true,
	},
]

function TransactionHistoryTable() {
	
	const { address, transactionList, setTransactionList } = useContext(WalletContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);

	useEffect(() => {
		const init = async () => {
			setIsLoading(true)
			const data = await fetchTransactionList(address, 1, 10)
			setTransactionList(data)
			setIsLoading(false)
		}
		init()
	}, [])

	 const onPageChange = async (page, offset) => {
    setIsLoading(true);
    // Fetch transactions for the given page and offset
    const transactions = await fetchTransactionList(address, page, offset);
    setIsLoading(false);

    setTransactionList(transactions);
    setCurrentPage(page);
  };

	return isLoading ? (
		<span className="m-auto mt-3" style={{ display: 'flex' }}>
			Loading Transactions <SyncLoader size={10} />
		</span>
	) : (
		<div className="container">
			<div style={{ marginTop: 20 }}>
				<BootstrapTable
					striped
					hover
					keyField="transactionHash"
					data={transactionList}
					columns={columns}
					filter={filterFactory()}
				/>
				<div>
					<div className="d-flex" style={{ justifyContent: 'space-between' }}>
						<Input
							style={{ width: '80px' }}
							type="select"
							className="form-control"
							value={sizePerPage}
							onChange={(e: any) => {
								setSizePerPage(e.target.value)
								onPageChange(currentPage, e.target.value)
							}}
						>
							<option value={5}>5</option>
							<option value={10}>10</option>
						</Input>

						<div className="ml-auto">
							<Button
								color="primary"
								size="sm"
								className="mx-1"
								onClick={() => onPageChange(currentPage - 1, sizePerPage)}
								disabled={currentPage === 1}
							>
								Prev
							</Button>
							Page: {currentPage}
							<Button
								color="primary"
								size="sm"
								className="mx-1"
								onClick={() => onPageChange(currentPage + 1, sizePerPage)}
								disabled={transactionList.length < sizePerPage}
							>
								Next
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TransactionHistoryTable
