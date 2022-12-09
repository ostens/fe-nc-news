import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Profile() {
  const { user, setUser } = useContext(UserContext);

  return (
    <main className="page">
      <h3>
        {user
          ? `You are logged in as ${user}`
          : `Would you like to log in again as grumpy19? `}
      </h3>
      <button
        className="btn btn-neutral"
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
