import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Home = () => {
  const user = useContext(UserContext);
  const { photoURL, displayName, email, availBalance, unrealisedBalance } =
    user;
  console.log(user);
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
        <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
          <div
            style={{
              background: `url(${
                photoURL ||
                "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
              })  no-repeat center center`,
              backgroundSize: "cover",
              height: "200px",
              width: "200px",
            }}
            className="border border-blue-300"
          ></div>
          <div className="md:pl-4">
            <h2 className="text-2xl font-semibold">{displayName}</h2>
            <h3 className="italic">{email}</h3>
          </div>
        </div>
        {/* <div className="unrBal">Unrealised Balance: {unrealisedBalance}</div> */}
        <div className="availBal">Available Balance: {availBalance}</div>
      </div>
    </div>
  );
};

export default Home;
