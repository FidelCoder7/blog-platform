import { useState } from "react";
import api from "../api/axios";

function Register() {
  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: ""
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post(
      "/auth/register",
      formData
    );

    alert("Registration successful");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
      />

      <input
        placeholder="Email"
      />

      <input
        placeholder="Password"
      />

      <button>
        Register
      </button>
    </form>
  );
}

export default Register;