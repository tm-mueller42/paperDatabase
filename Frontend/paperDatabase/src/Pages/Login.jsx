import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { Buffer } from 'buffer';
import { userLogin} from '../Requests/login.js';
import { useStore } from "../Zustand/useStore.js";

const Login = () => {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  //const [loggedIn, setLoggedIn] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);

  const isLoggedIn = useStore((state) => state.loggedIn);
  const setLoggedInTrue = useStore((state) => state.setLoggedInTrue);
  const setLoggedInFalse = useStore((state) => state.setLoggedInFalse);

  const setStoredUserName = useStore((state) => state.setUsername);
  const clearStoredUserName = useStore((state) => state.clearUsername);
  const setJwt = useStore((state) => state.setJwt);
  const clearJwt = useStore((state) => state.clearJwt);

  function handleLogin(event) {
    event.preventDefault();
    userLogin(username, password)
      .then(returnedJwt => {
        if(returnedJwt) {
          //localStorage.setItem('jwt', jwt)
          setJwt(returnedJwt);
          setInvalidLogin(false);
          setLoggedInTrue();
          setStoredUserName(username);
        }
        else {
          setInvalidLogin(true);
          setUsername(null);
          setPassword(null);
          setLoggedInFalse();
          clearJwt();
          clearStoredUserName();
        }
      })
      .catch(error => console.log('ERROR: ' + error));
  }

  function removeJwt() {
    localStorage.removeItem('jwt');
    setUsername(null);
    setPassword(null);
    //setLoggedIn(!loggedIn);
    setLoggedInFalse();
  }


  if (isLoggedIn) {
    return (
      <>
        <h1>You are logged in</h1>
        <button type="button" onClick={removeJwt}> Logout </button>
      </>
    )
  }


  return (
    <>
      <form className="EmployeeForm" onSubmit={handleLogin}>

      <div className="control">
        <label htmlFor="username">Username:</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          id="username"
        />
      </div>

      <div className="control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
      </div>


      <div className="buttons">
        <button type="submit" >
          Submit
        </button>

        <Link to={`/`}>
          <button type="button">Cancel</button>
        </Link>
      </div>
    </form>
    {invalidLogin && 
      <p>Invalid username or password!</p>
    }
    </>
  );
};

export default Login;
