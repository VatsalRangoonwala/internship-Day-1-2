import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  if (!user) {
  return (
    <div className="container">
      <h2>Access Denied</h2>
      <p>Please login to update your profile.</p>
      <button className="btn" onClick={() => navigate("/login")}>
        Go to Login
      </button>
    </div>
  );
}

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    contact: user.contact,
  });

  const [message, setMessage] = useState("");
  const [contactError, setContactError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      if (!/^\d*$/.test(value)) return;
      setContactError(value.length !== 10 ? "Contact must be 10 digits" : "");
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(contactError) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/update/${user._id}`,
        formData
      );

      setMessage(res.data.message);

      // Go back to dashboard with updated data
      setTimeout(() => {
        navigate("/dashboard", { state: { user: res.data.user } });
      }, 1500);
    } catch (error) {
      setMessage("Update failed");
    }
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>

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
          <label>Contact</label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            maxLength="10"
            required
          />
          {contactError && <span className="error">{contactError}</span>}
        </div>

        {message && <p className="success">{message}</p>}

        <button className="btn" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;