import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./PageHome";
import Trade from "./pages/PageTrade";
import Portfolio from "./pages/PagePortfolio";
import Profile from "./pages/PageProfile";
import LogOut from "./pages/PageLogOut";
import PageAuth from "./pages/PageLogin";
import Backtest from "./pages/PageBacktest";
import { UserContext } from "../providers/UserProvider";

function Application() {
  const user = useContext(UserContext);
  return user ? (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/trade" component={Trade} />
        <Route path="/backtest" component={Backtest} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/profile" component={Profile} />
        <Route path="/logout" component={LogOut} />
      </Switch>
    </Router>
  ) : (
    <PageAuth />
  );
}
export default Application;
