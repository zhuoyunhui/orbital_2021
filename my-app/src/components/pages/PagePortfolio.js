/*
To display user's open positions and trade histories
- Retrieve data from Firestore queries

To include `sell` function under open positions 
- Update user data from Firestore 
*/

import React from "react";
import History from "../History";
import DisplayPos from "../DisplayPos";
import "./PagePortfolio.css";

const Portfolio = () => {
  return (
    <div class="container">
      <h1 class="position"> Open Positions</h1>
      <div className="display">
        <DisplayPos />
      </div>
      <h1 class="history"> Trade History</h1>
      <div className="historyfn">
        <History />
      </div>
    </div>
  );
};

export default Portfolio;

/*
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
*/
