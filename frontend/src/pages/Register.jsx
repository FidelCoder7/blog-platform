import { useState } from "react";
import api from "../api/axios";

function Register() {
  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/register",
        formData
      );

      console.log(response.data);


      alert(
        "Registration successful"
      );
    } catch (error) {
      console.log(error);

      console.log(error.response);


      alert(
         error.response?.data?.detail ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;