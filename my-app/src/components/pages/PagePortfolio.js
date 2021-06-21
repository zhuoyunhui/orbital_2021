/*
To display user's open positions and trade histories
- Retrieve data from Firestore queries

To include `sell` function under open positions 
- Update user data from Firestore 
*/

import React from "react";
import OpenPos from "../OpenPos";
import DisplayPos from "../DisplayPos";

const Portfolio = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <h1>Portfolio</h1>
      <DisplayPos />
      <OpenPos />
    </div>
  );
};

export default Portfolio;
