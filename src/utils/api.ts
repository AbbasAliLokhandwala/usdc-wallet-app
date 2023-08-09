export const fetchTransactionList = async (
  address: string,
  page: number,
  offset: number
) => {
  const data = await fetch(
    `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=desc&apikey=2G3ZRWKIQQWNVIT4D6QMN55E9ZQHSUKGPN`
  );
  const response = await data.json();
  const transactionData = response.result.map((item: any) => ({
    transactionHash: item.hash,
    value: parseFloat(item.value) / 1e18,
    from: item.from,
    to: item.to,
    blockNumber: item.blockNumber,
    timestamp: new Date(parseInt(item.timeStamp * 1000)).toLocaleDateString(),
    time: new Date(parseInt(item.timeStamp * 1000)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
  }));
  return transactionData;
};
