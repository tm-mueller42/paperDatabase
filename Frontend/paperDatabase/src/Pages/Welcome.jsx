import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { Link, useNavigate, } from "react-router-dom";
import { useStore } from "../Zustand/useStore";

const Welcome = () => {  

  const isLoggedIn = useStore((state => state.loggedIn));
  const user = useStore((state) => state.username);

  return (
    <>
      {!isLoggedIn &&
        <>
          <h1>Welcome to the Science Paper Database</h1>
          <Link to={`/login`}>
            <button type="button">Login</button>
          </Link>
          <Link to={`/register`}>
            <button type="button">Register</button>
          </Link>
        </>
      }  
      {isLoggedIn &&
      <h1>Welcome, {user}</h1>}
    </>
  );
};

export default Welcome;
