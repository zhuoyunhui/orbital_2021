import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { Card, Icon, Grid, Divider } from "semantic-ui-react";
import UnrealisedBal from "./UnrealisedBal";
import DailyPnl from "./DailyPnl";
import image from "./Images/matthew.png";
import "./PageHome.css";

const Home = () => {
  const user = useContext(UserContext);
  UnrealisedBal(user);
  const { displayName, email, availBalance } = user;
  const percentagepnl = ((user.unrealisedBalance - 10000) / 100).toFixed(2);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <div className="card">
              <Card>
                <img src={image} alt="IMG" />
                <Card.Content>
                  <Card.Header> {displayName} </Card.Header>
                  <Card.Description>
                    <Icon name="mail" /> {email}
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div className="font">
              <h1 style={{ fontFamily: "Quantico" }}> Welcome! </h1>
              <Divider clearing />
              <div className="innerfont">
                <h3 style={{ fontFamily: "Quantico" }}>
                  Available Balance:{"  $"}
                  {availBalance}
                </h3>
                <h3 style={{ fontFamily: "Quantico" }}>
                  <UnrealisedBal />
                </h3>
                <h3 style={{ fontFamily: "Quantico" }}>
                  Unrealised Profit & Loss: $
                  {(user.unrealisedBalance - 10000).toFixed(2)} (
                  {percentagepnl > 0 ? "+" + percentagepnl : percentagepnl}%)
                </h3>
                <h3 style={{ fontFamily: "Quantico" }}>
                  <DailyPnl />
                </h3>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
