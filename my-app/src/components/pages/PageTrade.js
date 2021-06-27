/*
To display Trading view APIs
To include 'trade now!' button that creates a pop-up window
- Pop-up window to link to the following:
    1) Tradingview / alpha vantage(?) API to retrieve real time stock price 
    2) Firestore to update the trade records & retrieve userID data 
*/
import React, { useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import Buy from "../Buy";
import Sell from "../Sell";
import DisplayStock from "../StockPage";
import TradingView from "../TradingView";
import "./PageTrade.css";


const Trade = () => {
  const user = useContext(UserContext);
  const [ticker, setTicker] = useState("aapl");

  const handleInputChange = (event) => {
    setTicker(event.target.value);
  };
  return (
    <div class = "wrapper" style={{
          justifyContent: "center",
        }}>
      <label htmlFor="ticker">ticker: </label>
      <select value={ticker} onChange={handleInputChange} name="ticker">
        <option value="aapl">AAPL</option>
        <option value="amzn">AMZN</option>
        <option value="gme">GME</option>
        <option value="tsla">TSLA</option>
      </select>
      <div class="functions">
        <h1>Trade</h1>
        <Buy ticker={ticker} />
        <Sell ticker={ticker}/>
        <TradingView ticker={ticker}/>
        <DisplayStock />
      </div>
    </div>
  );
};

export default Trade;
