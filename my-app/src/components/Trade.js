/*
pop-up window prompted with 'trade now!' button at PageTrade.js

funtions:
- buy() : update trade & user info collected from the form to Firestore 
    - to check if able to purchase with available balance
    - if not able to purchase, then reject request & display an alert meessage?
- stockPrice() : retrive real time stock market price for a given ticker 
*/
import React, { useState, useContext } from 'react';
import firebase from "../config/firebase";
import { UserContext } from "../providers/UserProvider";

const AddTrade = () => {
    const user = useContext(UserContext);

    const initialTradeState = {
        tradeID: user.email + " @ " + new Date().toLocaleString(),
        transactionTime: new Date().toLocaleString(),
        ticker: "AAPL",
        quantity: "",
        entPrice: 132.00,
        userID: user.email
    }
    const [trade, setTrade] = useState(initialTradeState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTrade({ ...trade, [name]: value });
    };

    const saveTrade = () => {
        var data = {
            tradeID: trade.tradeID,
            transactionTime: trade.transactionTime,
            ticker: trade.ticker,
            quantity: trade.quantity,
            entPrice: trade.entPrice,
            userID: trade.userID
        };
        /* update trades table */
        firebase.collection("trades").add(data)
            .then(() => {
                console.log("Traded Successfully.");
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
        /* update users table */
        /*
        const currABal = firebase.collection('users').doc(user.uid).get('availBalance');
        firebase.collection('users').doc(user.uid).update({ 
            availBalance: currABal
        })
        
        /* update positions table */


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
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
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
                    <button onClick={saveTrade} classname="btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};
export default AddTrade;