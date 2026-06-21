import { useState } from "react";

import api from "../api/axios";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  return (
    <div className="form-container">
      <form>
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;