import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchCommentsByArticleId } from "../utils/api";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import NewComment from "./NewComment";

function CommentList({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedComments, setDeletedComments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchCommentsByArticleId(articleId).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [articleId, deletedComments]);

  if (isLoading) return <p>Getting your comments...</p>;
  if (!comments.length) return <p>Looks like there aren't any comments yet!</p>;
  return (
    <section className="comment-list">
      <NewComment articleId={articleId} setComments={setComments} />
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <CardHeader
              author={comment.author}
              created_at={comment.created_at}
              isDeleteable={comment.author === user}
              comment_id={comment.comment_id}
              setDeletedComments={setDeletedComments}
            />
            <p>{comment.body}</p>
            <CardFooter
              votes={comment.votes}
              id={comment.comment_id}
              article={false}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CommentList;
