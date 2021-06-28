import React, { useState, useContext } from "react";
import { firestore } from "../config/firebase";
import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";
import { Button } from "@material-ui/core";

function Sell({ ticker }) {
  const user = useContext(UserContext);

  const [quantity, setQuantity] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setQuantity(event.target.value);
  };

  const SaveSell = () => {
    const stockApi = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/latestPrice?token=pk_0705469d87aa4650835b7e7c86e61296`;
    console.log(ticker);
    firestore
      .collection("positions")
      .where("ticker", "==", ticker)
      .where("userID", "==", user.email)
      .get()
      .then((doc) => {
        if (!doc.empty) {
          /* find current quantity*/
          firestore
            .collection("positions")
            .doc(user.email + " " + ticker)
            .get()
            .then((doc) => {
              const currQty = doc.data().quantity;
              if (quantity <= currQty) {
                /* update positions table */
                firestore
                  .collection("positions")
                  .doc(user.email + " " + ticker)
                  .update({
                    quantity: firebase.firestore.FieldValue.increment(
                      quantity * -1
                    ),
                  });
                /* delete document if quantity = 0 */
                if (quantity === currQty) {
                  firestore
                    .collection("positions")
                    .doc(user.email + " " + ticker)
                    .delete();
                }

                fetch(stockApi)
                  .then((res) => res.json())
                  .then((price) => {
                    /* update trades table */
                    var data = {
                      tradeID: user.email + " @ " + new Date().toLocaleString(),
                      transactionTime: new Date().toLocaleString(),
                      ticker: ticker,
                      quantity: parseInt(quantity, 10),
                      entPrice: price,
                      userID: user.email,
                      type: "sell",
                    };
                    firestore.collection("trades").add(data);

                    /* update users table */
                    firestore
                      .collection("users")
                      .doc(user.uid)
                      .update({
                        availBalance: firebase.firestore.FieldValue.increment(
                          quantity * price
                        ),
                      })
                      .then(() => {
                        console.log("Sold Successfully.");
                        setSubmitted(true);
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  });
              } else {
                console.log("You have insufficient stock quantity.");
                setError(true);
              }
            });
        } else {
          console.log("You have insufficient stock quantity.");
          setError(true);
        }
      });
  };

  const newSell = () => {
    setQuantity(0);
    setSubmitted(false);
    setError(false);
  };
  return (
    <div className="submit-form">
      {error ? (
        <div>
          <h4>You have insufficient stock quantity.</h4>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            onClick={newSell}
          >
            Sell
          </Button>
        </div>
      ) : submitted ? (
        <div>
          <h4>Sold Successfully.</h4>
          <button className="btn-success" onClick={newSell}>
            Sell
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="quantity">Sell (quantity): </label>
            <input
              type="number"
              classname="form-control"
              id="quantity"
              required
              value={quantity}
              onChange={handleInputChange}
              name="quantity"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            onClick={SaveSell}
            classname="btn-success"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}

export default Sell;
