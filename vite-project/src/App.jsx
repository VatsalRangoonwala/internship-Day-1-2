import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";
import "./App.css";
import Dashboard from "./Dashboard";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
