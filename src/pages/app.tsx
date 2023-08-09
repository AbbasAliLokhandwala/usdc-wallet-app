import { useContext } from "react";
import ConnectWallet from "@/components/ConnectWallet";
import { WalletContext } from "@/context/WalletContext";
import ConnectedWalletInfo from "@/components/ConnectedInfo";

const App = () => {
  const { address } = useContext(WalletContext);
  console.log(address);
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
  );
};

export default App;
