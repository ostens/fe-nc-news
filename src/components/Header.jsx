import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { profile } from "../icons";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <Link to="/articles" className="link">
        <h1>🏠 NC News</h1>
      </Link>
      <Link to="/profile" className="btn-align-right link">
        <img src={profile} alt="profile icon" className="icon" />
        {user ? <p>{user}</p> : <p>Login</p>}
      </Link>
    </header>
  );
}

export default Header;
