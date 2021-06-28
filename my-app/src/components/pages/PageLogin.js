import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { Button, Container } from "@material-ui/core"; //Box, Paper,
import image from "../Images/img-01.png";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./PageLogin.css";

var rootStyle = {
  backgroundColor: "#1c2237",
  color: "#1c2237",
  height: "100vh",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function PageAuth() {
  const handleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  const classes = useStyles();

  return (
    <div style={rootStyle}>
      <Container component="main" maxWidth="xs" color="#fff">
        <CssBaseline />
        <div className={classes.paper}>
          <div className="image" data-tilt="">
            <img src={image} alt="IMG" />
          </div>
          <div className="SignIn">
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
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PageAuth;

// <Box
//   display="flex"
//   justifyContent="center"
//   alignItems="center"
//   minHeight="100vh"
// >
//   <Paper>
//     <div className="image" data-tilt="">
//       <img src={image} alt="IMG" />
//     </div>
//     <div className="SignIn">
//       <FirebaseAuthConsumer>
//         {({ firebase }) => (
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleSignIn(firebase)}
//           >
//             Sign in with Google
//           </Button>
//         )}
//       </FirebaseAuthConsumer>
//     </div>
//   </Paper>
// </Box>;
