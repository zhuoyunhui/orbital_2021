import React, { useState, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import Buy from "./Buy";
import Sell from "./Sell";
import TradingView from "./TradingView";

function Trade() {
  const user = useContext(UserContext);
  const [ticker, setTicker] = useState("aapl");

  const handleInputChange = (event) => {
    setTicker(event.target.value);
  };
  return (
    <div className="tradeview">
      <label htmlFor="ticker">ticker: </label>
      <select value={ticker} onChange={handleInputChange} name="ticker">
        <option value="aapl">AAPL</option>
        <option value="amzn">AMZN</option>
        <option value="gme">GME</option>
        <option value="tsla">TSLA</option>
      </select>
      <Buy ticker={ticker} />
      <Sell ticker={ticker} />
      <TradingView ticker={ticker}/>
    </div>
  );
}

export default Trade;
