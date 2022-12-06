import React, { useEffect, useState } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

function CommentList({ articleId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchCommentsByArticleId(articleId).then((comments) => {
      setComments(comments);
    });
  }, [articleId]);

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
