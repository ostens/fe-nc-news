import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../utils/api";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";

function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetchArticle(id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <p>Getting your article...</p>;
  else
    return (
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
        />
      </div>
    );
}

export default Article;
