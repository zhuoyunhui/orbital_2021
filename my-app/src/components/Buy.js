/*
pop-up window prompted with 'trade now!' button at PageTrade.js

funtions:
- buy() : update trade & user info collected from the form to Firestore 
    - to check if able to purchase with available balance
    - if not able to purchase, then reject request & display an alert meessage?
- stockPrice() : retrive real time stock market price for a given ticker 
*/
import React, { useState, useContext } from "react";
import { firestore } from "../config/firebase";
import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";
import { Button, Grid } from "semantic-ui-react";
import { Stockprice } from "./Stockprice";
import "./Buy.css";

function Buy({ ticker }) {
  const user = useContext(UserContext);

  const initialTradeState = {
    tradeID: "",
    transactionTime: "",
    ticker: ticker,
    quantity: 0,
    entPrice: 0,
    userID: user.email,
    type: "buy",
  };
  const [trade, setTrade] = useState(initialTradeState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTrade({ ...trade, [name]: value });
  };

  const SaveTrade = async () => {
    const price = await Stockprice(ticker);
    var data = {
      tradeID: user.email + " @ " + new Date().toLocaleString(),
      transactionTime: new Date().toLocaleString(),
      ticker: ticker,
      quantity: parseInt(trade.quantity, 10),
      entPrice: price,
      userID: trade.userID,
      type: "buy",
    };

    const sufficientBal = user.availBalance >= data.quantity * data.entPrice;

    if (sufficientBal) {
      /* update trades table */
      firestore.collection("trades").add(data);

      /* update users table (update urlBalance when we get real-time data)*/
      firestore
        .collection("users")
        .doc(user.uid)
        .update({
          availBalance: user.availBalance - data.quantity * data.entPrice,
        });

      /* update positions table */
      const pdoc = await firestore
        .collection("positions")
        .doc(user.email + " " + data.ticker)
        .get();
      if (pdoc.exists) {
        /* update avgPrice (NOT TESTED) */
        const pdata = pdoc.data();
        console.log(pdata);
        const newAvg =
          (pdata.quantity * pdata.avgPrice + data.quantity * data.entPrice) /
          (pdata.quantity + data.quantity);
        firestore
          .collection("positions")
          .doc(user.email + " " + data.ticker)
          .update({
            quantity: firebase.firestore.FieldValue.increment(data.quantity),
            avgPrice: newAvg,
          });
      } else {
        firestore
          .collection("positions")
          .doc(user.email + " " + data.ticker)
          .set({
            userID: user.email,
            ticker: data.ticker,
            quantity: parseInt(data.quantity, 10),
            avgPrice: data.entPrice,
          });
      }
      console.log("Traded Successfully.");
      setSubmitted(true);
    } else {
      console.log("Not enough Balance.");
      setError(true);
    }
  };

  const newTrade = () => {
    setTrade(initialTradeState);
    setSubmitted(false);
    setError(false);
  };

  return (
    <div className="submit-form">
      {error ? (
        <div>
          <h4 style={{ fontFamily: "Quantico" }}>Not enough balance.</h4>
          <Button size="mini" compact onClick={newTrade}>
            Buy
          </Button>
        </div>
      ) : submitted ? (
        <div>
          <h4 style={{ fontFamily: "Quantico" }}>Traded Successfully.</h4>
          <Button size="mini" compact onClick={newTrade}>
            Buy Again
          </Button>
        </div>
      ) : (
        <Grid>
          <div className="form-group">
            <label htmlFor="quantity">Buy (quantity): </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              required
              value={trade.quantity}
              onChange={handleInputChange}
              name="quantity"
            />
          </div>
          <Button size="mini" compact onClick={SaveTrade}>
            Submit
          </Button>
        </Grid>
      )}
    </div>
  );
}
export default Buy;
