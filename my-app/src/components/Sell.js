import React, { useState, useContext, } from 'react';
import { firestore }  from "../config/firebase";
import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";

function Sell() {
    const user = useContext(UserContext);

    const initialQuantity = 0
        
    
    const [quantity, setQuantity] = useState(initialQuantity);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        setQuantity(event.target.value);
    };

    const SaveSell = () => {
        /* update positions table */
        firestore
            .collection('positions')
            .doc(user.email + 'AAPL')
            .update({
                quantity: firebase.firestore.FieldValue.increment(quantity)
            })
            
        /* update users table */
        firestore 
            .collection('users')
            .doc(user.uid)
            .update({
                availBalance: firebase.firestore.FieldValue.increment(quantity * 132)
            })
            .then(() => {
                console.log("Sold Successfully.");
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const newSell = () => {
        setQuantity(0);
        setSubmitted(false);
    }
    return (
        <div className="submit-form">
            {submitted ? (
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
                    <button onClick={SaveSell} classname="btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}

export default Sell;