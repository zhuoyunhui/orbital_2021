import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { Button, Container, Grid } from "semantic-ui-react"; //Box, Paper,
import image from "../Images/img-01.png";
import { makeStyles } from "@material-ui/core/styles";
import Particles from "react-tsparticles";
import "./PageLogin.css";

var rootStyle = {
  backgroundColor: "#1c2237",
  color: "#1c2237",
  height: "100vh",
};

const useStyles = makeStyles((theme) => ({
  paper: {
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
    <>
      <div style={rootStyle}>
        <div className="Outer">
          <div className="inner">
            <Container textAlign="center">
              <div className={classes.paper}>
                <Container>
                  <h1
                    style={{
                      fontFamily: "Quantico",
                      fontSize: "200px",
                      color: "white",
                    }}
                  >
                    {" "}
                    PYPR
                  </h1>
                  <div className="caption">
                    <h3
                      style={{
                        fontFamily: "Quantico",
                        fontSize: "40px",
                        color: "white",
                      }}
                    >
                      Web-based trading simulator
                    </h3>
                    <h4
                      style={{
                        fontFamily: "Quantico",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      {" "}
                      Explore & practice your trading strategies with no
                      financial risk!{" "}
                    </h4>
                    <div className="button">
                      <FirebaseAuthConsumer>
                        {({ firebase }) => (
                          <Button
                            variant="contained"
                            color="violet"
                            onClick={() => handleSignIn(firebase)}
                          >
                            SIGN IN WITH GOOGLE
                          </Button>
                        )}
                      </FirebaseAuthConsumer>
                    </div>
                  </div>
                </Container>
              </div>
            </Container>
          </div>
          <Particles
            id="tsparticles"
            options={{
              background: {
                color: {
                  value: "#1c2237",
                },
              },
              fpsLimit: 60,
              interactivity: {
                detectsOn: "canvas",
                events: {
                  resize: true,
                },
                modes: {
                  bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40,
                  },
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outMode: "bounce",
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  random: true,
                  value: 5,
                },
              },
              detectRetina: true,
            }}
          />
        </div>
      </div>
    </>
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
