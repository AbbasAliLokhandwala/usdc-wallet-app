import React, { useContext } from "react";
import { Col, Row } from "reactstrap";
import { WalletContext } from "../context/WalletContext";
import formatAddress from "@/utils/formatAddress";
const WalletDetails = () => {
  const { address, tokenBal, bal } = useContext(WalletContext);
  return (
    <>
      <Row>
        <Col sm={6} className="heading">
          Account:
        </Col>
        <Col sm={6} className="value">
          {formatAddress(address)}
        </Col>
      </Row>
      <Row>
        <Col sm={6} className="heading">
          Ether Balance:
        </Col>
        <Col sm={6} className="value">
          {bal.substring(0, 8)}
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
  );
};

export default WalletDetails;
