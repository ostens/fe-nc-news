import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { close } from "../icons";
import { postComment } from "../utils/api";

function NewComment({ setComments, articleId }) {
  const [newComment, setNewComment] = useState("");
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [err, setErr] = useState(null);

  const { user } = useContext(UserContext);

  const handleReset = (e) => {
    e.preventDefault();
    setIsWritingComment(false);
    setNewComment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPosting(true);
    setErr(null);
    postComment(articleId, user, newComment)
      .then((comment) => {
        setIsPosting(false);
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
    <section className="form-area">
      {isWritingComment ? (
        <form onSubmit={handleSubmit}>
          <section className="section-header">
            <label htmlFor="comment" className="comment-label">
              Comment:
            </label>
            <button
              type="reset"
              className="btn-align-right btn-round"
              onClick={handleReset}
            >
              <img className="icon" src={close} alt="close icon" />
            </button>
          </section>
          <textarea
            autoFocus
            id="comment"
            className="form-input"
            disabled={isPosting}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
          />
          {isPosting ? (
            <div className="loader"></div>
          ) : (
            <button
              type="submit"
              disabled={!newComment.length}
              className="btn-align-right btn-primary"
            >
              Submit
            </button>
          )}
        </form>
      ) : (
        <button
          className="btn-align-right btn-primary"
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
