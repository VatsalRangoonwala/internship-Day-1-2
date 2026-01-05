import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  console.log(userId);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    contact: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Protect page + fetch user data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        setFormData({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          gender: res.data.user.gender,
          contact: res.data.user.contact,
        });
        setLoading(false);
      })
      .catch(() => {
        // ❌ Not logged in
        navigate("/login");
      });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:5000/api/users/update", formData, {
        withCredentials: true,
      });

      setMessage(res.data.message);
      // Redirect back to dashboard after update
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setMessage("Profile update failed");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Update Profile</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            maxLength="10"
            required
          />
        </div>

        {message && <p className="success">{message}</p>}

        <button type="submit" className="btn">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
