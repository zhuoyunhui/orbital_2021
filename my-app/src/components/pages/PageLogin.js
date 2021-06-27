/*
Firebase authentication 
*/

import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { Button } from "@material-ui/core";

function PageAuth() {
  const handleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <FirebaseAuthConsumer>
        {({ firebase }) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSignIn(firebase)}
          >
            Sign in with Google
          </Button>
        )}
      </FirebaseAuthConsumer>
    </>
  );
}

export default PageAuth;

