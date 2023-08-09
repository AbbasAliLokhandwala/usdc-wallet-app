import React, { createContext, useEffect, useState } from "react";
import {
  getUSDCBalance,
  getSignerAddress,
  isValidAddress,
  getBalance,
} from "../utils/ethersUtils";
import { USDC_TOKEN } from "@/utils/consts";
import { fetchTransactionList } from "../utils/api";
import { abi, collectData } from "../utils/subscription";
import Web3, { SubscriptionError } from "web3";
const web3 = new Web3(
  "wss://mainnet.infura.io/ws/v3/55fe2b930c1e49e88f098b1a062cd01b"
);
export interface WalletContextType {
  address: string | null;
  bal: string;
  tokenBal: number | null;
  transactionList: any[];
  setTransactionList: any;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  fetchBalances: () => Promise<void>;
}

export const WalletContext = createContext<WalletContextType>({
  address: null,
  bal: null,
  tokenBal: null,
  transactionList: [],
  setTransactionList: [],
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  fetchBalances: async () => {},
});

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState<any>();
  const [tokenBal, setTokenBal] = useState<any>();
  const [bal, setBal] = useState<any>();
  const [transactionList, setTransactionList] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum && window.ethereum.isMetaMask) {
          const addr = await getSignerAddress();
          const tokenBalance = await getUSDCBalance();
          const balance = await getBalance();
          setBal(balance);
          setTokenBal(tokenBalance);
          setAddress(addr);

          if (isValidAddress(addr)) {
            const transactions = await fetchTransactionList(addr, 1, 10);
            setTransactionList(transactions);
          }

          const getOptions = (connectedAddress: any) => {
            return {
              // address: connectedAddress,
              // topics: [web3.utils.sha3("Transfer(address,address,uint256)")],
            };
          };
          const options = getOptions(address);
          web3.eth.clearSubscriptions(() => {console.log("Killed subs"); });
          let subscription = web3.eth.subscribe("pendingTransactions");
          subscription.on("data", async (event: any) => {
            console.log(await event, "adsad");
            if (event.topics.length == 3) {
              let transaction = web3.eth.abi.decodeLog(
                [
                  {
                    type: "address",
                    name: "from",
                    indexed: true,
                  },
                  {
                    type: "address",
                    name: "to",
                    indexed: true,
                  },
                  {
                    type: "uint256",
                    name: "value",
                    indexed: false,
                  },
                ],
                event.data,
                [event.topics[1], event.topics[2], event.topics[3]]
              );
              const contract = new web3.eth.Contract(abi, USDC_TOKEN.address);
              console.log(transaction);

              collectData(contract).then((contractData) => {
                const unit: any = Object.keys(web3.utils.unitMap).find(
                  (key) =>
                    web3.utils.unitMap[key] ===
                    web3.utils
                      .toBN(10)
                      .pow(web3.utils.toBN(contractData.decimals))
                      .toString()
                );

                console.log(
                  `Transfer of ${web3.utils.fromWei(transaction.value, unit)} ${
                    contractData.symbol
                  } from ${transaction.from} to ${transaction.to}`
                );

                setTransactionList();
              });
            }
          });
          subscription.on("error", (err) => {
            throw err;
          });
          subscription.on("connected", (nr) =>
            console.log("Subscription on ERC-20 started with ID %s", nr)
          );
        }
      } catch (err) {
        console.log(err);
      }

      if (window.ethereum) {
        window.ethereum.on("accountsChanged", connectWallet);
      }
    };
    init();
  }, []);

  const fetchBalances = async () => {
    if (isValidAddress(address)) {
      const tokenBalance = await getUSDCBalance();
      const balance = await getBalance();
      setBal(balance);
      setTokenBal(tokenBalance);
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const addr = await getSignerAddress();
        const tokenBalance = await getUSDCBalance();
        const balance = await getBalance();
        setBal(balance);
        setTokenBal(tokenBalance);
        setAddress(addr);

        if (isValidAddress(addr)) {
          const transactions = await fetchTransactionList(addr, 1, 10);
          setTransactionList(transactions);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = async () => {
    try {
      setAddress(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        bal,
        tokenBal,
        transactionList,
        setTransactionList,
        connectWallet,
        disconnectWallet,
        fetchBalances,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
