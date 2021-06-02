import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


export const config = {
    apiKey: "AIzaSyCha_PYH3Gv8emlGncWRhIMxjNdbicbnUA",
    authDomain: "pypr-7ed5a.firebaseapp.com",
    databaseURL: "https://pypr-7ed5a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pypr-7ed5a",
    storageBucket: "pypr-7ed5a.appspot.com",
    messagingSenderId: "781738002624",
    appId: "1:781738002624:web:cf29427602ead5dded4525"
    /*
    apiKey: "AIzaSyCJHjm-vEpf-pKEeu26LtgD30EV0FM4ggQ",
    authDomain: "react-tutorial-f8dd3.firebaseapp.com",
    projectId: "react-tutorial-f8dd3",
    storageBucket: "react-tutorial-f8dd3.appspot.com",
    messagingSenderId: "862388970073",
    appId: "1:862388970073:web:6e0f6ca983850c0a42c748",
    measurementId: "G-GVJD5X97B7"
    */
}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        unrealisedBalance: 10000,
        availBalance: 10000,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};