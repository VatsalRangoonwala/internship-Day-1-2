import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    contact: "",
  });

  const [contactError, setContactError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState({});
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  // const navigate = useNavigate();

  useEffect(() => {
    loadCaptcha();
  }, []);

  const loadCaptcha = async () => {
    const res = await axios.get("http://localhost:5000/api/captcha/generate", {
      withCredentials: true,
    });
    // console.log("Captcha data:", res.data);
    setCaptcha(res.data);
    setCaptchaAnswer("");
    setCaptchaError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      if (!/^\d*$/.test(value)) return;
      setContactError(value.length !== 10 ? "Contact must be 10 digits" : "");
    }

    if (name === "confirmPassword") {
      setPasswordError(
        value !== formData.password ? "Passwords do not match" : ""
      );
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCaptchaError("");

    if (contactError || passwordError) return;

    try {
      // VERIFY CAPTCHA FIRST
      await axios.post(
        "http://localhost:5000/api/captcha/verify",
        { userAnswer: captchaAnswer },
        { withCredentials: true }
      );

      // IF CAPTCHA IS VALID → REGISTER USER
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          contact: formData.contact,
        },
        { withCredentials: true }
      );

      setEmailMessage(res.data.message);
      setIsSuccess(true);
      navigate("/Login");
    } catch (error) {
      // CAPTCHA FAILED
      if (error.response?.data?.message === "Invalid captcha") {
        setCaptchaError("Invalid captcha, try again");
        // loadCaptcha(); // generate new captcha
      } else {
        setEmailMessage(error.response?.data?.message || "Registration failed");
        setIsSuccess(false);
      }
    }
  };

  return (
    <div className="container">
      <h2>Register New User</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {emailMessage && (
            <span className={isSuccess ? "success" : "error"}>
              {emailMessage}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleChange}
              />{" "}
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            maxLength="10"
            required
          />
          {contactError && <span className="error">{contactError}</span>}
        </div>

        <div className="form-group">
          <h4>Captcha</h4>
          <label>
            What is {captcha?.num1} + {captcha?.num2} ?
          </label>

          <input
            type="number"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            required
          />

          {captchaError && <span className="error">{captchaError}</span>}
        </div>
        <button
          type="button"
          className="btn"
          style={{ marginTop: "10px" }}
          onClick={loadCaptcha}
        >
          Refresh Captcha
        </button>

        <button type="submit" className="btn">
          Register
        </button>
        <p style={{ textAlign: "center" }}>
          If already a user <Link to="/Login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;
