import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import HistoryPage from "./pages/History/HistoryPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";
import { selectUser } from "./store/slices/authSlice";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const user = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/" />}
        />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
