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
    <div className="DisplayPos">
      {positions.map((vari) => (
        <div>
          <h4>{vari.ticker}</h4>
          <h4>{vari.quantity}</h4>
        </div>
      ))}
    </div>
  );
}

export default DisplayPos;
