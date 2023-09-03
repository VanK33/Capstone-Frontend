import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import PublicPage from "./pages/PublicPage/PublicPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import UserPage from "./pages/UserPage/UserPage";
import { useState } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_PORT;
// console.log("URL", URL);
function App() {
  const storedToken = sessionStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const [currentUser, setCurrentUser] = useState();
  const handleLogIn = async (data, navigate) => {
    try {
      let response = await axios.post(`${URL}:${PORT}/auth/login`, {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      } else {
        throw new Error("Token Set Failure");
      }
      console.log("token", token);

      try {
        fetchUserProfile(response.data.token);
        navigate("/public");
      } catch (error) {
        console.log("Error feteching user profile", error);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${URL}:${PORT}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error.response);
      throw error;
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/public" />} />
        <Route
          path="/public"
          element={<PublicPage token={token} currentUser={currentUser} />}
        />
        <Route
          path="/auth/registration"
          element={<AuthPage page={`registration`} />}
        />
        <Route
          path="/auth/login"
          element={<AuthPage page={`login`} handleLogIn={handleLogIn} />}
        />
        <Route
          path="/auth/:id/profile"
          element={<UserPage token={token} currentUser={currentUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
