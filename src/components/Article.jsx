import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { fetchArticle } from "../utils/api";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CommentList from "./CommentList";
import { backArrow } from "../icons";
import ErrorPage from "./ErrorPage";

function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchArticle(id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  }, [id]);

  if (error) return <ErrorPage msg={error} />;
  if (isLoading) return <p>Getting your article...</p>;
  else
    return (
      <main>
        <Link to="/articles">
          <img src={backArrow} className="icon" alt="back icon" />
        </Link>
        <div className="article-container ">
          <CardHeader
            author={article.author}
            created_at={article.created_at}
            topic={article.topic}
          />
          <main>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
          </main>
          <CardFooter
            votes={article.votes}
            comment_count={article.comment_count}
            id={article.article_id}
          />
          <CommentList articleId={id} />
        </div>
      </main>
    );
}

export default Article;
