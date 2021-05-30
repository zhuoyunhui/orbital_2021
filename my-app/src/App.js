import React from "react";
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}
export default App;

/*
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";
import PageLogin from "./pages/PageLogin";
import PageTrade from "./pages/PageTrade";

function App() {
  return (
    <div className="App">
      <IfFirebaseAuthed> 
        <PageTrade />
      </IfFirebaseAuthed>
      <IfFirebaseUnAuthed>
       <PageLogin />  
      </IfFirebaseUnAuthed>
    </div>
  );
}


export default App;
*/
