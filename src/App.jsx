import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import PublicPage from "./pages/PublicPage/PublicPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import UserPage from "./pages/UserPage/UserPage";
import { useEffect, useState } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_PORT;
// console.log("URL", URL);
function App() {
  const storedToken = sessionStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const handleLogIn = async (data) => {
    try {
      let response = await axios.post(`${URL}:${PORT}/auth/login`, {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        // token = response.data.token;
        sessionStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/public" />} />
        <Route path="/public" element={<PublicPage token={token} />} />
        <Route
          path="/auth/registration"
          element={<AuthPage page={`registration`} />}
        />
        <Route
          path="/auth/login"
          element={<AuthPage page={`login`} handleLogIn={handleLogIn} />}
        />
        <Route path="/auth/:id/profile" element={<UserPage />} token={token} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
