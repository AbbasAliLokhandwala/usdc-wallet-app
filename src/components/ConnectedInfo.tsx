import React, { useContext } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { WalletContext } from "../context/WalletContext";
import WalletDetails from "./WalletDetails";
import TransactionHistoryTable from "./TranxTable";
const ConnectedWalletInfo = () => {
  const { disconnectWallet } = useContext(WalletContext);

  return (
    <>
      <Card
        style={{
          width: "400px",
          fontWeight: "bold",
          margin: "auto",
          top: "20px",
        }}
      >
        <CardBody>
          <WalletDetails />
          <Button color="primary" block onClick={() => disconnectWallet()}>
            Disconnect Wallet
          </Button>
        </CardBody>
      </Card>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <TransactionHistoryTable />
      </div>
    </>
  );
};

export default ConnectedWalletInfo;
