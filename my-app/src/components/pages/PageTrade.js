/*
To display Trading view APIs
To include 'trade now!' button that creates a pop-up window
- Pop-up window to link to the following:
    1) Tradingview / alpha vantage(?) API to retrieve real time stock price 
    2) Firestore to update the trade records & retrieve userID data 
*/

import AddTrade from "../Trade";
import Sell from "../Sell";
import DisplayStock from "../StockPage";

import React from "react";

const Trade = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <h1>Trade</h1>
      <AddTrade />
      <Sell />
      <DisplayStock />
    </div>
  );
};

export default Trade;
