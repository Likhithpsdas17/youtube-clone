import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
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
      const response =
        await API.post(
          "/auth/login",
          formData
        );
        console.log(formData);
        localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

return (
  <div className="login-container">
    <div className="login-card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>

      <div className="login-footer">
        Don't have an account?{" "}
        <span
          onClick={() =>
            navigate("/register")
          }
        >
          Register
        </span>
      </div>
    </div>
  </div>
);
}

export default Login;