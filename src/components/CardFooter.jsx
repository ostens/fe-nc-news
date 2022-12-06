import { useState } from "react";

import { upArrow, downArrow, comment } from "../icons";
import { voteById } from "../utils/api";

function CardFooter({ votes, comment_count, id, article = true }) {
  const [optimisticVotes, setOptimisticVotes] = useState(votes);
  const [voted, setVoted] = useState("");
  const [err, setErr] = useState(null);

  const handleVote = (increment) => {
    setOptimisticVotes((currVotes) => currVotes + increment);
    setVoted(increment === 1 ? "up" : "down");
    setErr(null);
    voteById(id, increment, article).catch((err) => {
      setOptimisticVotes((currVotes) => currVotes - 1);
      setErr("Something went wrong. Please try again.");
    });
  };

  if (err) return <p>{err}</p>;
  return (
    <footer className="card-footer">
      <section className="votes">
        <button
          onClick={() => {
            handleVote(1);
          }}
          className={voted === "up" ? "green" : "grey"}
        >
          <img src={upArrow} className="icon" alt="up arrow icon"></img>
        </button>
        <p>{optimisticVotes}</p>
        <button
          onClick={() => {
            handleVote(-1);
          }}
          className={voted === "down" ? "red" : "grey"}
        >
          <img src={downArrow} className="icon" alt="down arrow icon"></img>
        </button>
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
