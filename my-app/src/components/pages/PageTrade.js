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
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import React from "react";
import "./PageTrade.css";

const Trade = () => {
  return (
    <div class = "wrapper" style={{
          justifyContent: "center",
        }}>
      <div class="widget">
        <TradingViewWidget
          symbol="NASDAQ:AAPL"
          locale="fr"
          width="980"
          height="610"
        />
      </div>
      <div class="functions">
        <h1>Trade</h1>
        <AddTrade />
        <Sell />
        <DisplayStock />
      </div>
    </div>
  );
};

export default Trade;
