import { Link } from "react-router-dom";
import "./navbar.css"
import { APP_NAME } from "../Constants/appData";
function NavBar() {
  return (
    <nav className="nav-bar" >
      <p className="logo" >{APP_NAME}</p>
      <div className="container-btn-auth" >
        <Link className="nav-bar-links" to={"/register"}>Register</Link>
        <Link className="nav-bar-links" to={"/login"}>Login</Link>
      </div>
    </nav>
  );
}

export { NavBar };
