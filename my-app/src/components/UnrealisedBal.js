import { useContext, useEffect } from "react";
import { firestore } from "../config/firebase";
import { UserContext } from "../providers/UserProvider";
import { Stockprice } from "./Stockprice";

function UnrealisedBal() {
  const user = useContext(UserContext);
  var prices = [];

  useEffect(() => {
    async function getBal() {
      const querySnapshot = await firestore
        .collection("positions")
        .where("userID", "==", user.email)
        .get();

      for (const doc of querySnapshot.docs) {
        const price = await Stockprice(doc.data().ticker);
        prices.push(doc.data().quantity * price);
        console.log(price);
      }

      firestore
        .collection("users")
        .doc(user.uid)
        .update({
          unrealisedBalance:
            user.availBalance + prices.reduce((a, b) => a + b, 0),
        });
    }
    getBal();
  }, [prices, user.availBalance, user.email, user.uid]);

  return <div>Unrealised Balance: ${user.unrealisedBalance.toFixed(2)}</div>;
}

export default UnrealisedBal;
