import React from "react";
import History from "../History";
import DisplayPos from "../DisplayPos";
import "./PagePortfolio.css";
import { Container } from "semantic-ui-react";

const Portfolio = () => {
  return (
    <Container>
      <div class="container">
        <h1 class="position" style={{ fontFamily: "Quantico" }}>
          Open Positions
        </h1>
        <div className="display">
          <DisplayPos />
        </div>
        <h1 class="history" style={{ fontFamily: "Quantico" }}>
          Trade History
        </h1>
        <div className="historyfn">
          <History />
        </div>
      </div>
    </Container>
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
