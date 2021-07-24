import { FirebaseAuthConsumer } from "@react-firebase/auth";
import {auth} from "../../config/firebase";

function SignOut() {

  return (
    <>
      <FirebaseAuthConsumer>
      <button className = "signout" onClick = {() => {auth.signOut()}}>Sign out</button>
      </FirebaseAuthConsumer>
    </>
  );
}

export default SignOut;
