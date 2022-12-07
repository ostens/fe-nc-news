import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Profile() {
  const { user, setUser } = useContext(UserContext);

  return (
    <main className="profile">
      <p>
        {user
          ? `You are logged in as ${user}`
          : `Would you like to log in again as grumpy19? `}
      </p>
      <button
        className="form-button neutral"
        onClick={() => {
          setUser((currentUser) => (currentUser ? null : "grumpy19"));
        }}
      >
        {user ? "Log out" : "Log in"}
      </button>
    </main>
  );
}

export default Profile;
