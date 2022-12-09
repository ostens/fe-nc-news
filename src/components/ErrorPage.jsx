import React from "react";
import { Link } from "react-router-dom";

function ErrorPage({ msg }) {
  return (
    <main className="page">
      <h3>Oops!</h3>
      <p>{msg || "Page not found"}</p>
      <Link to="/articles" className="link form-button neutral">
        Go Home
      </Link>
    </main>
  );
}

export default ErrorPage;
