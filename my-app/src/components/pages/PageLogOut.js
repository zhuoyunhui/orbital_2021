import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { auth } from "../../config/firebase";

function SignOut() {
  // const handleLogout = (firebase) => {
  //   firebase.auth().signOut();
  // };

  return (
    <>
      <FirebaseAuthConsumer>
        <button
          className="signout"
          onClick={() => {
            auth.signOut();
          }}
        >
          Sign out
        </button>
      </FirebaseAuthConsumer>
    </>
  );
}

export default SignOut;
