import "./Header.css";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { useLogoutMutation } from "../../store/api/authApi";

function Header() {
  const user = useSelector(selectUser);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="header">
      <div className="devot_logo">
        <img
          src="/images/devot_logo.svg"
          alt="logo_devot"
          width={162}
          height={44}
        ></img>
      </div>
      {user && (
        <div className="links">
          <Link to="/">
            <div className="link">
              <i className="pi pi-clock"></i>
              Trackers
            </div>
          </Link>
          <Link to="history">
            <div className="link">
              <i className="pi pi-history"></i>
              History
            </div>
          </Link>
          <Link to="/login">
            <div onClick={handleLogout} className="link">
              <i className="pi pi-power-off"></i>
              Logout
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
