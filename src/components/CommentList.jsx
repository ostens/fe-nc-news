import React, { useEffect, useState } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

function CommentList({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCommentsByArticleId(articleId).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [articleId]);

  if (isLoading) return <p>Getting your comments...</p>;
  if (!comments.length) return <p>Looks like there aren't any comments yet!</p>;
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.comment_id}>
          <CardHeader author={comment.author} created_at={comment.created_at} />
          <p>{comment.body}</p>
          <CardFooter votes={comment.votes} />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
