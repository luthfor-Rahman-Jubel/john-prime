import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createNewUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInwithEmailAndPassword } from './LoginManager';

function App() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
      isSignedIn: false,
      name:'',
      email:'',
      photo:'',
      password:'',
      error:'',
      success: false
    });
    initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }
  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const googleSignOut = ()=>{
    handleSignOut()
    .then(res =>{
    handleResponse(res, false);
    })
  }

  const fbSignIn = ()=>{
    handleFbSignIn()
    .then(res =>{
     handleResponse(res, true);
    })
  }
  const handleBlur = (event) =>{
    let isFieldValid = true;
    if(event.target.name === 'email'){
      isFieldValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      isFieldValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(event.target.value);
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

const handleSubmit = (e) => {

  if(newUser && user.email && user.password){
    createNewUserWithEmailAndPassword(user.name, user.email, user.password)
    .then(res =>{
     handleResponse(res, true);
    })
  
  }

  if(!newUser && user.email && user.password){
    signInwithEmailAndPassword(user.email, user.password)
    .then(res => {
     handleResponse(res, true);
    })
  }
  e.preventDefault();
}

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <h2>React Application for using that</h2>
         { 
          user.isSignedIn ? <button style={{cursor:'pointer'}} onClick={googleSignOut}>Sign Out</button> : 
          <button onClick={googleSignIn} style={{cursor:'pointer'}}>Sign In</button>
          
         }
          {
            user.isSignedIn && <div>
              <p>Welcome: {user.name} </p>
              <p>Email: {user.email} </p>
              <p> <img style={{borderRadius:'50%'}} src={user.photo} alt="userPhoto" /> </p>
            </div>
          }
          <div className="sing-in-with-fb">
            <h2>Sign In using Facebook</h2>
            <button onClick={fbSignIn} style={{cursor:'pointer'}}>Sign in using facebook</button>
          </div>
         <div className="ownLogin">
           <h2>Custom Authentication </h2>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
            <label htmlFor="newUser">New User Sign Up</label>
           <form onSubmit={handleSubmit}>
           {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder=" Type Your Name Here..." required />}
             <br />
             <input type="text" name="email" onBlur={handleBlur} placeholder=" Type Your Email Here.." required/>
             <br />
             <input type="password" onBlur={handleBlur} name="password" placeholder="type your Password here.." id="pass" required />
             <br />
             <input type="submit" value={newUser?'submit':'Log In' } />
           </form>
           <p style={{color:'red'}}> {user.error} </p>
           {user.success &&  <p style={{color:'green'}}>User {newUser ? 'Created':'Logged In'} Successfully </p> }
         </div>
        </nav>
      </header>
    </div>
  );
}

export default App;
