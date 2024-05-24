import "./Header.css";
import { Link } from "react-router-dom";

const user = true;
const logOut = () => console.log("logout");

function Header() {
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
            <div onClick={logOut} className="link">
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
