import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageLogin from "./pages/PageLogin";
import PageTrade from "./pages/PageTrade";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" />
        </Switch>
      </Router>

      <div className="App">
        <IfFirebaseAuthed>
          <PageTrade />
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          <PageLogin />
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
