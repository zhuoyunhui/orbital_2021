import { useState, useEffect, useContext } from "react";
import { firestore } from "../config/firebase";
import { UserContext } from "../providers/UserProvider";

function DisplayPos() {
  const user = useContext(UserContext);
  const [positions, setPositions] = useState([]); //create state to store data

  useEffect(() => {
    firestore
      .collection("positions")
      .where("userID", "==", user.email)
      .onSnapshot((snapshot) => {
        setPositions(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <table class="DisplayTable">
      <thead>
        <tr>
          <th>ticker</th>
          <th>quantity</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((vari) => (
          <tr>
            <td>{vari.ticker}</td>
            <td>{vari.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DisplayPos;

