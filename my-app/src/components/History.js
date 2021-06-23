/*
display a list of all opened positions

funtions:
- sell() : update user info collected from the form to Firestore 
    - make changes to available balance based on the price from stockPrice()
    - remove trade info from user 
    - update trade history for user 
- stockPrice() : retrive real time stock market price for a given ticker 
*/

/*
display a list of all opened positions

funtions:
- sell() : update user info collected from the form to Firestore 
    - make changes to available balance based on the price from stockPrice()
    - remove trade info from user 
    - update trade history for user 
- stockPrice() : retrive real time stock market price for a given ticker 
*/

import { useState, useEffect, useContext } from "react";
import { firestore } from "../config/firebase";
import { UserContext } from "../providers/UserProvider";

function History() {
  const user = useContext(UserContext);
  const [trades, setTrades] = useState([]); //create state to store data

  useEffect(() => {
    firestore
      .collection("trades")
      .where("userID", "==", user.email)
      .onSnapshot((snapshot) => {
        setTrades(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <table class="OpenTable">
      <thead>
        <tr>
          <th>ticker</th>
          <th>quantity</th>
          <th>entry price</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((vari) => (
          <tr>
            <td>{vari.ticker}</td>
            <td>{vari.quantity}</td>
            <td>{vari.entPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
