import React, { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import { Link } from "react-router-dom";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Getting your articles...</p>;
  return (
    <ul>
      {articles.map((article) => {
        return (
          <li key={article.article_id}>
            <CardHeader
              author={article.author}
              created_at={article.created_at}
              topic={article.topic}
            />
            <Link to={`/articles/${article.article_id}`} className="link">
              <h2>{article.title}</h2>
            </Link>
            <CardFooter
              votes={article.votes}
              comment_count={article.comment_count}
              id={article.article_id}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ArticleList;
