import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/pages/PageHome";
import Trade from "./components/pages/PageTrade";
import Portfolio from "./components/pages/PagePortfolio";
import Profile from "./components/pages/PageProfile";
import Login from "./components/pages/PageLogin";
import "./App.css";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <>
      <div className="App">
        <IfFirebaseAuthed>
          <UserProvider>
            <Router>
              <Navbar />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/trade" component={Trade} />
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/profile" component={Profile} />
                <Route path="/login" component={Login} />
              </Switch>
            </Router>
          </UserProvider>
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          <h1 className="hi">hi</h1>
        </IfFirebaseUnAuthed>
      </div>
    </>
  );
}

export default App;

// import React from "react";
// import Application from "./components/Application";
// import UserProvider from "./providers/UserProvider";
// import Navbar from './components/Navbar'

// function App() {
//   return (
//     <UserProvider>
//       <Application />
//     </UserProvider>
//   );
// }
// export default App;