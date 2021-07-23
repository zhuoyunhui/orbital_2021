import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Icon, Image } from "semantic-ui-react";
import UnrealisedBal from "./UnrealisedBal";
import image from "./Images/matthew.png";

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
  UnrealisedBal(user);
  const { photoURL, displayName, email, availBalance, unrealisedBalance } =
    user;
  console.log(user);
  const classes = useStyles();

  return (
    <>
      <Card.Group>
        <Card>
          <img src={image} alt="IMG" />
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
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
                <div className="availBal">
                  Available Balance: {availBalance}
                </div>
                <UnrealisedBal />
              </div>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </>
  );
};

export default Home;
