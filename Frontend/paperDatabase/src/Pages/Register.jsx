import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import Loading from "../Components/Loading";

const BACKEND_ENDPOINT = 'http://localhost:8083/';
const BACKEND_REGISTER = `${BACKEND_ENDPOINT}register`;

const createUser = (user) => {
  const headers = new Headers();
    headers.set('Content-Type', 'application/json')
    return fetch(BACKEND_REGISTER, { method: 'POST', headers: headers, body: JSON.stringify(user) })
       .then((res) => res.json())
       .catch(error => console.log('ERROR: ' + error));
}

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  

  function handleRegister(event) {
    event.preventDefault();
    setLoading(true);
    let user = {
      username:username,
      password:password,
      email:email,
      authorities: ["ROLE_USER"],
    }
    createUser(user)
    .then(() => {
      setLoading(false);
      navigate("/login");
    })
    
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <form className="EmployeeForm" onSubmit={handleRegister}>

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
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
          />
        </div>

        <div className="control">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
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
    </>
  );
};

export default Register;
