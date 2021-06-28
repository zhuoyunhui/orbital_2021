/*
display a list of all opened positions

/*
display a list of all opened positions
funtions:
- sell() : update user info collected from the form to Firestore 
    - make changes to available balance based on the price from stockPrice()
    - remove trade info from user 
    - update trade history for user 
- stockPrice() : retrive real time stock market price for a given ticker 
*/

import React, { useState, useEffect, useContext } from "react";
import { firestore } from "../config/firebase";
import { UserContext } from "../providers/UserProvider";
import "./Tables.css";

function History() {
  const user = useContext(UserContext);
  const [buys, setBuys] = useState([]);
  const [sells, setSells] = useState([]);

  useEffect(() => {
    firestore
      .collection("trades")
      .where("userID", "==", user.email)
      .where("type", "==", "buy")
      .onSnapshot((snapshot) => {
        setBuys(snapshot.docs.map((doc) => doc.data()));
      });
    firestore
      .collection("trades")
      .where("userID", "==", user.email)
      .where("type", "==", "sell")
      .onSnapshot((snapshot) => {
        setSells(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="History">
      <h4>Buys</h4>
      <table class="OpenTable">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Quantity</th>
            <th>Entry Price</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {buys.map((buy) => (
            <tr>
              <td>{buy.ticker}</td>
              <td>{buy.quantity}</td>
              <td>{buy.entPrice}</td>
              <td>{buy.transactionTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Sells</h4>
      <table class="OpenTable">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Quantity</th>
            <th>Exit Price</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sells.map((sell) => (
            <tr>
              <td>{sell.ticker}</td>
              <td>{sell.quantity}</td>
              <td>{sell.entPrice}</td>
              <td>{sell.transactionTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;

/*
useEffect(() => {
        firestore.collection('trades')
            .get()
            .then(snapshot => {
                const trades = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    trades.push(data)
                })
                t
            })
            .catch(error => console.log(error))
    }

    );
*/

*/
