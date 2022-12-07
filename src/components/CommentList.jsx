import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchCommentsByArticleId, postComment } from "../utils/api";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import { close } from "../icons";

function CommentList({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [err, setErr] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchCommentsByArticleId(articleId).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [articleId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsWritingComment(false);
    setComments((currComments) => [
      ...currComments,
      { body: newComment, author: user },
    ]);
    setNewComment("");

    setErr(null);
    postComment(articleId, user, newComment).catch((err) => {
      setComments((currComments) => {
        currComments.pop();
        setComments(currComments);
        setErr("Something went wrong. Please try again.");
      });
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setIsWritingComment(false);
    setNewComment("");
  };

  if (isLoading) return <p>Getting your comments...</p>;
  if (!comments.length) return <p>Looks like there aren't any comments yet!</p>;
  if (err) return <p>{err}</p>;

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.comment_id}>
          <CardHeader author={comment.author} created_at={comment.created_at} />
          <p>{comment.body}</p>
          <CardFooter
            votes={comment.votes}
            id={comment.comment_id}
            article={false}
          />
        </li>
      ))}
      <section className="comment">
        {isWritingComment ? (
          <form onSubmit={handleSubmit}>
            <section className="input-area">
              <label htmlFor="comment">Comment: </label>
              <button
                type="reset"
                className="cancel-button"
                onClick={handleReset}
              >
                <img className="icon" src={close} alt="close icon" />
              </button>
              <textarea
                autoFocus
                id="comment"
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
                value={newComment}
              />
            </section>
            <section className="form-buttons">
              <button type="submit" className="form-button">
                Submit
              </button>
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
    </ul>
  );
}

export default CommentList;
