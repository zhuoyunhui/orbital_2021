import { FirebaseAuthConsumer } from "@react-firebase/auth";

function SignOut() {
  const handleLogout = (firebase) => {
    firebase.auth().signOut();
  };

  console.log("hi");

  return (
    <>
      <FirebaseAuthConsumer>
        {({ firebase }) => handleLogout(firebase)}
      </FirebaseAuthConsumer>
    </>
  );
}

export default SignOut;
