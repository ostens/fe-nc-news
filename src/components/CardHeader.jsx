import React from "react";
import { profile } from "../icons";

function CardHeader({ author, created_at, topic }) {
  return (
    <header>
      <section className="author">
        <img src={profile} className="profile-icon" alt="profile icon"></img>
        <section className="author-details">
          <h3>{author}</h3>
          <p className="date-time">{created_at}</p>
        </section>
      </section>
      <p className="pill">{topic}</p>
    </header>
  );
}

export default CardHeader;
