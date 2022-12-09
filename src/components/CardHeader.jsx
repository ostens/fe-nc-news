import { useState } from "react";
import { useViewport } from "../hooks/UseViewport";
import { profile, trash, close } from "../icons";
import { deleteComment } from "../utils/api";

function CardHeader({
  author,
  created_at,
  topic,
  isDeleteable,
  comment_id,
  setDeletedComments,
}) {
  const [isAwaitingConfirmation, setIsWaitingConfirmation] = useState(null);
  const [err, setErr] = useState(null);
  const { width, breakpoint } = useViewport();

  const handleClick = (e) => {
    e.preventDefault();
    if (isAwaitingConfirmation) {
      deleteComment(comment_id)
        .then(() => {
          setDeletedComments((curr) => [...curr, comment_id]);
          setIsWaitingConfirmation(false);
        })
        .catch((err) => {
          setErr("Something went wrong. Please try again.");
        });
    } else {
      setIsWaitingConfirmation(true);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsWaitingConfirmation(false);
  };

  if (err) return <p>{err}</p>;
  return (
    <header>
      <section className="author">
        <img src={profile} className="profile-icon" alt="profile icon"></img>
        <section className="author-details">
          <h3>{author}</h3>
          <p className="date-time">{created_at}</p>
        </section>
        {isDeleteable ? (
          <section className="delete">
            <button
              onClick={handleClick}
              className={`sort ${isAwaitingConfirmation ? "danger" : null}`}
            >
              <img src={trash} className="icon" alt="bin icon" />
              {isAwaitingConfirmation && width > breakpoint
                ? "Confirm Delete"
                : null}
            </button>
            {isAwaitingConfirmation ? (
              <button onClick={handleCancel}>
                <img src={close} className="icon" alt="" />
              </button>
            ) : null}
          </section>
        ) : null}
      </section>
      {topic ? <p className="pill">{topic}</p> : null}
    </header>
  );
}

export default CardHeader;
