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
