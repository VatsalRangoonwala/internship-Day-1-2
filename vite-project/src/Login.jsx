import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      loginData
    );

    // ✅ Navigate to dashboard with user data
    navigate("/dashboard", { state: { user: res.data.user } });

  } catch (error) {
    setMessage(error.response?.data?.message || "Login failed");
    setIsSuccess(false);
  }
};

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>

        {message && (
          <span className={isSuccess ? "success" : "error"}>
            {message}
          </span>
        )}

        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
