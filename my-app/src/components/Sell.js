import React, { useState, useContext } from "react";
import { firestore } from "../config/firebase";
import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";
import { Button, Grid } from "semantic-ui-react";
import { Stockprice } from "./Stockprice";

function Sell({ ticker }) {
  const user = useContext(UserContext);

  const [quantity, setQuantity] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setQuantity(event.target.value);
  };

  const SaveSell = async () => {
    const sdoc = await firestore
      .collection("positions")
      .doc(user.email + " " + ticker)
      .get();

    if (sdoc.exists) {
      /* find current quantity*/
      const sdata = sdoc.data();
      /* delete document if quantity = 0 */
      if (quantity > sdata.quantity) {
        console.log("You have insufficient stock quantity.");
        setError(true);
      } else {
        if (quantity === sdata.quantity) {
          await firestore
            .collection("positions")
            .doc(user.email + " " + ticker)
            .delete();
        } else {
          /* update positions table */
          firestore
            .collection("positions")
            .doc(user.email + " " + ticker)
            .update({
              quantity: firebase.firestore.FieldValue.increment(quantity * -1),
            });
        }

        const price = await Stockprice(ticker);
        /* update trades table */
        var data = {
          tradeID: user.email + " @ " + new Date().toLocaleString(),
          transactionTime: new Date().toLocaleString(),
          ticker: ticker,
          quantity: parseInt(quantity, 10),
          entPrice: price,
          userID: user.email,
          realisedPnL: ((sdata.avgPrice - price) * sdata.quantity).toFixed(2),
          percentagePnL: (((sdata.avgPrice - price) / price) * 100).toFixed(2),
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
      }
    } else {
      console.log("You have insufficient stock quantity.");
      setError(true);
    }
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
          <h3 style={{ fontFamily: "Quantico" }}>
            You have insufficient stock quantity.
          </h3>
          <Button size="mini" compact onClick={newSell}>
            Sell
          </Button>
        </div>
      ) : submitted ? (
        <div>
          <h4 style={{ fontFamily: "Quantico" }}>Sold Successfully.</h4>
          <Button size="mini" compact onClick={newSell}>
            Sell Again
          </Button>
        </div>
      ) : (
        <Grid>
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
            size="mini"
            compact
            onClick={SaveSell}
            classname="btn-success"
          >
            Submit
          </Button>
        </Grid>
      )}
    </div>
  );
}

export default Sell;
