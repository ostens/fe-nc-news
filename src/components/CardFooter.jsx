import React from "react";
import { upArrow, downArrow, comment } from "../icons";

function CardFooter({ votes, comment_count }) {
  return (
    <footer className="card-footer">
      <section className="votes">
        <img src={upArrow} className="icon" alt="up arrow icon"></img>
        <p>{votes}</p>
        <img src={downArrow} className="icon" alt="down arrow icon"></img>
      </section>

      {comment_count ? (
        <section className="comments">
          <img src={comment} className="icon" alt="speech bubble icon"></img>{" "}
          <p>{comment_count}</p>
        </section>
      ) : null}
    </footer>
  );
}

export default CardFooter;
