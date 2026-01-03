import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  // If user refreshes page or opens directly
  if (!user) {
    return (
      <div className="container">
        <h2>Access Denied</h2>
        <button className="btn" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div>
        <strong>First Name:</strong> {user.firstName}
      </div>

      <div >
        <strong>Last Name:</strong> {user.lastName}
      </div>

      <div >
        <strong>Email:</strong> {user.email}
      </div>

      <div >
        <strong>Gender:</strong> {user.gender}
      </div>

      <div >
        <strong>Contact:</strong> {user.contact}
      </div>

      <button className="btn" onClick={() => navigate("/login")}>
        Logout
      </button>

      &nbsp;&nbsp;&nbsp;&nbsp;
      <button
        className="btn"
        onClick={() => navigate("/update-profile", { state: { user } })}
      >
        Update Profile
      </button>
    </div>
  );
}

export default Dashboard;
