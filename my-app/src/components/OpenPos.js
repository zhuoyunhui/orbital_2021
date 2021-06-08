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

function OpenPos() {
    const user = useContext(UserContext);
    const [trades, setTrades] = useState([]); //create state to store data

    useEffect(() => {
        firestore
            .collection('trades')
            .where("userID", "==", user.email)
            .onSnapshot(snapshot => {
                setTrades(snapshot.docs.map(doc => doc.data()))
            })
        }, [])
    return (
        <div className="OpenPos">
        {
            trades.map((vari) => (
                <div>
                    <h4>{vari.entPrice}</h4>
                    <h4>{vari.quantity}</h4>
                    <h4>{vari.ticker}</h4>
                </div>
            ))
        }
        </div>
    )
}

export default OpenPos;