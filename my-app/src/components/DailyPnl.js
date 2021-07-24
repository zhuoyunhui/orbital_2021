import { useContext, useEffect } from "react";
import { firestore } from "../config/firebase";
import { UserContext } from "../providers/UserProvider";
import { Closingprice } from "./Closingprice";
import { Stockprice } from "./Stockprice";

function DailyPnl() {
  const user = useContext(UserContext);
  var prices = [];

  useEffect(() => {
    async function daily() {
      const querySnapshot = await firestore
        .collection("positions")
        .where("userID", "==", user.email)
        .get();

      const ytd = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
      const yString =
        ytd.getFullYear().toString() +
        (ytd.getMonth() + 1).toString().padStart(2, "0") +
        ytd.getDate().toString().padStart(2, "0");

      for (const doc of querySnapshot.docs) {
        const ddata = doc.data();
        const price = await Stockprice(ddata.ticker);
        const ytdPrice = await Closingprice(ddata.ticker, yString);
        console.log(ytdPrice);
        console.log(price);
        prices.push((price - ytdPrice) * ddata.quantity);
      }

      firestore
        .collection("users")
        .doc(user.uid)
        .update({
          dailypnl: prices.reduce((a, b) => a + b, 0),
        });
    }
    daily();
  }); //[])

  return <div>Daily Profit & Loss: ${user.dailypnl.toFixed(2)}</div>;
}

export default DailyPnl;
