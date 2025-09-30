// src/components/NotFound.js
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";

function NotFound() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <button
        className="not-found-button"
        onClick={() => navigate(user ? "/" : "/login")}
      >
        Go to {user ? "Dashboard" : "Login"}
      </button>
    </div>
  );
}

export default NotFound;
