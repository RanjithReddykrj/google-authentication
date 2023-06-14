import './App.css';
import {useEffect} from 'react'
import jwt_decode from "jwt-decode"
import { useState } from 'react';
function App() {
  const [user,setUser]=useState({});
  function handleCallbackResponse(response){
    const userdata=jwt_decode(response.credential);
    setUser(userdata);
    document.getElementById('signInDiv').hidden=true;
  }
  function signOut(){
    setUser({});
  }
  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: "94063395624-334lr88jg7o44t2h9n8t5rmacfoml3gt.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  }, );
  
  return (
    <div className="App">
      {
        Object.keys(user).length === 0 &&
        <div id="signInDiv"></div>
      }
             
      
      {
        Object.keys(user).length !==0 && <div>
        <img src={user.picture}></img>
        <h3>{user.name}</h3>
        <button onClick={signOut}>Signout</button>
        
      </div> 
      
      
        }

    </div>
  );
}

export default App;
