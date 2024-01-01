import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { Buffer } from 'buffer';
import { userLogin} from '../Requests/login.js';
import { useStore } from "../Zustand/hooks.js";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [loggedIn, setLoggedIn] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);

  const isLoggedIn = useStore((state) => state.loggedIn);
  const setLoggedInTrue = useStore((state) => state.setLoggedInTrue);
  const setLoggedInFalse = useStore((state) => state.setLoggedInFalse);

  const setStoredUsername = useStore((state) => state.setUsername);
  const clearStoredUsername = useStore((state) => state.clearUsername);
  const setJwt = useStore((state) => state.setJwt);
  const clearJwt = useStore((state) => state.clearJwt);
  const setAuthorities = useStore((state) => state.setAuthorities);
  const clearAuthorities = useStore((state) => state.clearAuthorities);

  const getJwt = useStore((state) => state.jwt);
  const getUsername = useStore((state) => state.username);
  const getAuthorities = useStore((state) => state.authorities);

  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    userLogin(username, password)
      .then(returnedAuth => {
          setJwt(returnedAuth.jwt ? returnedAuth.jwt : "");
          setStoredUsername(returnedAuth.username? returnedAuth.username : "");
          setAuthorities(returnedAuth.authorities? returnedAuth.authorities : []);
          setInvalidLogin(false);
          setLoggedInTrue();
          navigate("/");
      })
      .catch(error => {
        console.log('ERROR: ' + error);
        setInvalidLogin(true);
        setUsername("");
        setPassword("");
        setLoggedInFalse();
        clearJwt();
        clearStoredUsername();
        clearAuthorities();
      });
  }

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <form className="RegistrationForm" onSubmit={handleLogin}>
      <h1>Login</h1>
        <div className="control">
          <label htmlFor="username">Username:</label>
          <input
            value={username? username : ""}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            id="username"
          />
        </div>
        <div className="control">
          <label htmlFor="password">Password:</label>
          <input
            value={password}
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
