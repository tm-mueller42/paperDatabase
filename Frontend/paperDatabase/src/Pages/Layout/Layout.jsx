import { Outlet, Link } from "react-router-dom";
import { useStore } from "../../Zustand/useStore";
import "./Layout.css";
import { useNavigate } from "react-router-dom";

const Layout = () => {

  const navigate = useNavigate();
  const isLoggedIn = useStore((state) => state.loggedIn);
  const clearStoredUserName = useStore((state) => state.clearUsername);
  const clearJwt = useStore((state) => state.clearJwt);
  const setLoggedInFalse = useStore((state) => state.setLoggedInFalse);

  const handleLogout = () => {
    clearStoredUserName();
    clearJwt();
    setLoggedInFalse();
    navigate("/");
  }

  return (
    <>
      <div className="Layout">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn &&
              <>
              <li >
                <Link to="/paper/allPapers">All Papers</Link>
              </li>
              <li className="grow">
                <Link to="/paper/myPapers">My Papers</Link>
              </li>
              <li>
                <Link to="/paper/create">
                  <button type="button">Add Paper</button>
                </Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>Logout</button>
              </li>
              </>
            }
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
