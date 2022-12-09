import React from "react";
import { Link } from "react-router-dom";

function ErrorPage({ msg, code }) {
  return (
    <main className="page">
      <h1>{code || 404}</h1>
      <p>{msg || "Page not found"}</p>
      <Link to="/articles" className="btn btn-neutral">
        Home
      </Link>
    </main>
  );
}

export default ErrorPage;
