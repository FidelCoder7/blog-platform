import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData =
        new URLSearchParams();

      formData.append(
        "username",
        email
      );

      formData.append(
        "password",
        password
      );

      const response =
        await api.post(
          "/auth/login",
          formData,
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded",
            },
          }
        );
      login(
        localStorage.setItem(
        "token",
                
        response.data.access_token
        )
        );

        localStorage.setItem(
          "user_id",
          response.data.user_id
        );

        localStorage.setItem(
          "username",
          response.data.username
        );

      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
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

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
