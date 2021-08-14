import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config';

export const initializeLoginFramework = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}
export  const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      console.log(res.user)
      const {displayName, photoURL, email} = res.user;
      const infoUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return(infoUser);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  export  const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth().signInWithPopup(fbProvider)
  .then(function(result) {

    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    user.success = true;
    return user;
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('Error Message is: ',errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

  });
  }

  export const handleSignOut = () =>{
   return firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      return (signOutUser);
    }).catch((error) => {
      console.log(error.message);
    });
  }

  export const createNewUserWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
     const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
     
    })
    .catch( error => {
      var errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInwithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword( email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
        var errorMessage = error.message;
        const newUserInfo = {};
        newUserInfo.error = errorMessage;
        newUserInfo.success = false;
        return newUserInfo;
    });
  }

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then( function() {
     console.log('User name Updated successfully');
    }).catch(function(error) {
      console.log(error);
    });  
  }

