import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      await API.post(
        "/auth/register",
        formData
      );
      
      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <button type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;