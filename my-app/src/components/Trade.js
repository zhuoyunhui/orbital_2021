/*
pop-up window prompted with 'trade now!' button at PageTrade.js

funtions:
- buy() : update trade & user info collected from the form to Firestore 
    - to check if able to purchase with available balance
    - if not able to purchase, then reject request & display an alert meessage?
- stockPrice() : retrive real time stock market price for a given ticker 
*/
import React, { useState, useContext, } from 'react';
import { firestore }  from "../config/firebase";
import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";

function AddTrade() {
    const user = useContext(UserContext);

    const initialTradeState = {
        tradeID: user.email + " @ " + new Date().toLocaleString(),
        transactionTime: new Date().toLocaleString(),
        ticker: "AAPL",
        quantity: 0,
        entPrice: 132.00,
        userID: user.email
    }
    const [trade, setTrade] = useState(initialTradeState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTrade({ ...trade, [name]: value });
    };

    const SaveTrade = () => {
        var data = {
            tradeID: trade.tradeID,
            transactionTime: trade.transactionTime,
            ticker: trade.ticker,
            quantity: parseInt(trade.quantity,10),
            entPrice: trade.entPrice,
            userID: trade.userID
        };
        /* update trades table */
        firestore.collection("trades").add(data)
            
        /* update users table (update urlBalance when we get real-time data)*/
        firestore
            .collection('users')
            .doc(user.uid)
            .update({ 
                availBalance: user.availBalance - (trade.quantity * trade.entPrice)
        })
        
        /* update positions table */
        firestore
            .collection('positions')
            .where('ticker', '==', trade.ticker)
            .where('userID', '==', user.email)
            .get()
            .then((snapshot) => {
                if (!snapshot.empty) {
                    firestore
                        .collection('positions')
                        .doc(user.email + trade.ticker)
                        .update({
                            quantity: firebase.firestore.FieldValue.increment(trade.quantity)
                        })
                } else {
                    firestore
                        .collection('positions')
                        .doc(user.email + trade.ticker)
                        .set({
                            userID: user.email,
                            ticker: trade.ticker,
                            quantity: parseInt(trade.quantity,10)
                        })
                }
            })
            .then(() => {
                console.log("Traded Successfully.");
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const newTrade = () => {
        setTrade(initialTradeState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
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
                            id= "quantity"
                            required
                            value={trade.quantity}
                            onChange={handleInputChange}
                            name="quantity"
                        />
                    </div>
                    <button onClick={SaveTrade} classname="btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};
export default AddTrade;