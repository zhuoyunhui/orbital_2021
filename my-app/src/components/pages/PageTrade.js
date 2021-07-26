/*
To display Trading view APIs
To include 'trade now!' button that creates a pop-up window
- Pop-up window to link to the following:
    1) Tradingview / alpha vantage(?) API to retrieve real time stock price 
    2) Firestore to update the trade records & retrieve userID data 
*/
// import DisplayStock from "../StockPage";
import React, { useState } from "react";
import { Box } from "@material-ui/core";
import TradingView from "../TradingView";
import Sell from "../Sell";
import Buy from "../Buy";
import "./PageTrade.css";

const Trade = () => {
  // const user = useContext(UserContext);
  const [ticker, setTicker] = useState("aapl");

  const handleInputChange = (event) => {
    setTicker(event.target.value);
  };
  return (
    <div class="wrapper">
      <div className="widget">
        <TradingView ticker={ticker} />
      </div>
      <div className="functions">
        <Box pt={2} pb={3}>
          <h1 style={{ fontFamily: "Quantico" }}>Trade Now!</h1>
        </Box>
        <label htmlFor="ticker" style={{ fontFamily: "Quantico" }}>
          Ticker:{" "}
        </label>
        <select value={ticker} onChange={handleInputChange} name="ticker">
          <option value="googl">Alphabet(GOOGL)</option>
          <option value="amzn">Amazon.com(AMZN)</option>
          <option value="aapl">Apple(AAPL)</option>
          <option value="ebay">eBay(EBAY)</option>
          <option value="fb">Facebook(FB)</option>
          <option value="msft">Microsoft(MSFT)</option>
          <option value="nflx">Netflix(NFLX)</option>
          <option value="nvda">NVIDIA Corp(NVDA)</option>
          <option value="roku">Roku Inc(ROKU)</option>
          <option value="tsla">Tesla Motors(TSLA)</option>
        </select>
        <Box pt={4}>
          <Buy ticker={ticker} />
        </Box>
        <Box pt={5}>
          <Sell ticker={ticker} />
        </Box>
      </div>
    </div>
  );
};

export default Trade;
