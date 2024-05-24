import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import HistoryPage from "./pages/History/HistoryPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";

function App() {
  const user = {
    name: "John",
    id: 1,
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={!user ? <Navigate to="/login" /> : <Dashboard />}
        />
        <Route
          path="/history"
          element={!user ? <Navigate to="/login" /> : <HistoryPage />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
