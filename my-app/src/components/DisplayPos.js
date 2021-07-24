import { useState, useEffect, useContext } from "react";
import { firestore } from "../config/firebase";
import { UserContext } from "../providers/UserProvider";
import { Stockprice } from "./Stockprice";
import "./Tables.css";

function DisplayPos() {
  const user = useContext(UserContext);
  var pposition = [];
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    async function display() {
      const querySnapshot = await firestore
        .collection("positions")
        .where("userID", "==", user.email)
        .get();

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const price = await Stockprice(data.ticker);
        pposition.push({
          ...doc.data(),
          currPrice: price,
          urlPnL: ((price - data.avgPrice) * data.quantity).toFixed(2),
          percentagePnL: (
            ((price - data.avgPrice) / data.avgPrice) *
            100
          ).toFixed(2),
        });
      }
      setPositions(pposition);
    }
    display();
  }); //[])

  return (
    <table class="DisplayTable">
      <thead>
        <tr>
          <th>ticker</th>
          <th>quantity</th>
          <th>average price</th>
          <th>latest price</th>
          <th>unrealised PnL</th>
          <th>% PnL</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((vari) => (
          <tr>
            <td>{vari.ticker}</td>
            <td>{vari.quantity}</td>
            <td>{vari.avgPrice}</td>
            <td>{vari.currPrice}</td>
            <td>{vari.urlPnL}</td>
            <td>{vari.percentagePnL}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DisplayPos;
