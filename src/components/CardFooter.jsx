import { useState } from "react";
import { upArrow, downArrow, comment } from "../icons";
import { voteById } from "../utils/api";

function CardFooter({ votes, comment_count, id, article = true }) {
  const [optimisticVotes, setOptimisticVotes] = useState(votes);
  const [currentVote, setCurrentVote] = useState(null);
  const [err, setErr] = useState(null);

  const handleVote = (voteDirection) => {
    let increment = voteDirection === "up" ? 1 : -1;

    if (!currentVote) {
      setCurrentVote(voteDirection);
    } else if (currentVote === voteDirection) {
      increment = -1 * increment;
      setCurrentVote(null);
    } else {
      increment = 2 * increment;
      setCurrentVote(voteDirection);
    }

    setOptimisticVotes((currVotes) => currVotes + increment);

    setErr(null);
    voteById(id, increment, article).catch((err) => {
      setOptimisticVotes((currVotes) => currVotes - 1);
      setErr("Something went wrong. Please try again.");
    });
  };

  if (err) return <p>{err}</p>;
  return (
    <footer className="section-header">
      {typeof votes === "number" ? (
        <section className="section-header">
          <button
            onClick={() => {
              handleVote("up");
            }}
            className={currentVote === "up" ? "selected" : null}
          >
            <img src={upArrow} className="icon" alt="up arrow icon"></img>
          </button>
          <p>{optimisticVotes}</p>
          <button
            onClick={() => {
              handleVote("down");
            }}
            className={currentVote === "down" ? "selected" : null}
          >
            <img src={downArrow} className="icon" alt="down arrow icon"></img>
          </button>
        </section>
      ) : null}

      {comment_count ? (
        <section className="section-header">
          <img src={comment} className="icon" alt="speech bubble icon"></img>{" "}
          <p>{comment_count}</p>
        </section>
      ) : null}
    </footer>
  );
}

export default CardFooter;
