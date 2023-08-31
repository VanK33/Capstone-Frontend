import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import PublicPage from "./pages/PublicPage/PublicPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import LogIn from "./components/LogIn/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/public" />} />
        <Route path="/public" element={<PublicPage />} />
        <Route
          path="/auth/registration"
          element={<AuthPage page={`registration`} />}
        />
        <Route path="/auth/login" element={<AuthPage page={`login`} />} /> */}
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
