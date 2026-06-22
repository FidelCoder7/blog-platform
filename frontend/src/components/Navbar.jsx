import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext }
from "../context/AuthContext";

function Navbar() {
  const {
    token,
    logout,
  } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h2>Blog Platform</h2>

      <div>

        <Link to="/">
          Home
        </Link>

        {token ? (
          <>
            <Link
              to="/create-post"
            >
              Create Post
            </Link>

            <button
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
            >
              Login
            </Link>

            <Link
              to="/register"
            >
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
