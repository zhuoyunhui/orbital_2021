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
import { Button } from "@material-ui/core";

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

  const SaveTrade = () => {
    const stockApi = `https://cloud.iexapis.com/stable/stock/${trade.ticker}/quote/latestPrice?token=pk_0705469d87aa4650835b7e7c86e61296`;

    fetch(stockApi)
      .then((res) => res.json())
      .then((price) => {
        var data = {
          tradeID: user.email + " @ " + new Date().toLocaleString(),
          transactionTime: new Date().toLocaleString(),
          ticker: ticker,
          quantity: parseInt(trade.quantity, 10),
          entPrice: price,
          userID: trade.userID,
          type: "buy",
        };

        const sufficientBal =
          user.availBalance >= data.quantity * data.entPrice;

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
          firestore
            .collection("positions")
            .where("ticker", "==", data.ticker)
            .where("userID", "==", user.email)
            .get()
            .then((snapshot) => {
              if (!snapshot.empty) {
                firestore
                  .collection("positions")
                  .doc(user.email + " " + data.ticker)
                  .update({
                    quantity: firebase.firestore.FieldValue.increment(
                      data.quantity
                    ),
                  });
              } else {
                firestore
                  .collection("positions")
                  .doc(user.email + " " + data.ticker)
                  .set({
                    userID: user.email,
                    ticker: data.ticker,
                    quantity: parseInt(data.quantity, 10),
                  });
              }
            })
            .then(() => {
              console.log("Traded Successfully.");
              setSubmitted(true);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          console.log("Not enough Balance.");
          setError(true);
        }
      });
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
          <h4>Not enough balance.</h4>
          <button className="btn-success" onClick={newTrade}>
            Buy
          </button>
        </div>
      ) : submitted ? (
        <div>
          <h4>Traded Successfully.</h4>
          <button className="btn-success" onClick={newTrade}>
            Buy
          </button>
        </div>
      ) : (
        <div>
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
          <Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            onClick={SaveTrade}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
export default Buy;
