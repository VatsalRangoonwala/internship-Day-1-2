import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  axios
    .get("http://localhost:5000/api/users/me", {
      withCredentials: true
    })
    .then(res => setUser(res.data.user))
    .catch(() => navigate("/login"));
}, []);

const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/users/logout",
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Contact:</strong> {user.contact}</p>

      <button
        className="btn"
        onClick={() => navigate("/update-profile")}
      >
        Update Profile
      </button>

      <button
        className="btn"
        onClick={handleLogout}
        style={{ marginLeft: "10px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
