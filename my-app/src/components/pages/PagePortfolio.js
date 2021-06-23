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
      <div class="wrapper1">
        <h1 class="position">Positions</h1>
        <div className="display">
          <DisplayPos />
        </div>
      </div>
      <div className="wrapper2">
        <h1 class="history">History</h1>
        <div className="historyfn">
          <History />
        </div>
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
