import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { close } from "../icons";
import { postComment } from "../utils/api";

function NewComment({ setComments, articleId }) {
  const [newComment, setNewComment] = useState("");
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const { user } = useContext(UserContext);

  const handleReset = (e) => {
    e.preventDefault();
    setIsWritingComment(false);
    setNewComment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr(null);
    postComment(articleId, user, newComment)
      .then((comment) => {
        setIsLoading(false);
        setComments((currComments) => {
          return [comment, ...currComments];
        });
        setNewComment("");
        setIsWritingComment(false);
      })
      .catch((err) => {
        setErr("Something went wrong. Please try again.");
      });
  };
  if (err) return <p>{err}</p>;
  return (
    <section className="comment">
      {isWritingComment ? (
        <form onSubmit={handleSubmit}>
          <section className="form-header">
            <label htmlFor="comment" className="comment-label">
              Comment:{" "}
            </label>
            <button
              type="reset"
              className="cancel-button"
              onClick={handleReset}
            >
              <img className="icon" src={close} alt="close icon" />
            </button>
          </section>
          <textarea
            autoFocus
            id="comment"
            className="comment-input"
            disabled={isLoading}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
          />
          <section className="form-buttons">
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <button type="submit" className="form-button">
                Submit
              </button>
            )}
          </section>
        </form>
      ) : (
        <button
          className="form-button"
          disabled={!user}
          title="Enabled title"
          onClick={() => setIsWritingComment(true)}
        >
          {!user ? "Login to add a comment" : "+ Add a new comment"}
        </button>
      )}
    </section>
  );
}

export default NewComment;
