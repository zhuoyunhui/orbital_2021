// performance dashboard

import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import UnrealisedBal from "../UnrealisedBal";
import DailyPnl from "../DailyPnl";

const Profile = () => {
  const user = useContext(UserContext);
  UnrealisedBal(user);

  const percentagepnl = ((user.unrealisedBalance - 10000) / 100).toFixed(2);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div>
        <h3>Available Balance: {(user.availBalance).toFixed(2)}</h3>
        <h3>
          <UnrealisedBal />
        </h3>
        <h3>Unrealised PnL: {(user.unrealisedBalance - 10000).toFixed(2)} ({(percentagepnl > 0) ? ("+" + percentagepnl) : percentagepnl}%)</h3>
        <h3>
          <DailyPnl />
        </h3>
      </div>
    </div>
  );
};

export default Profile;
