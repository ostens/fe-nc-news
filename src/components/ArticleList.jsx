import React, { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import TopicNav from "./TopicNav";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { topic } = useParams();

  useEffect(() => {
    fetchArticles(topic).then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic]);

  return (
    <section>
      <TopicNav selectedTopic={topic} />
      {isLoading ? (
        <p>Getting your articles...</p>
      ) : (
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.article_id}>
                <CardHeader
                  author={article.author}
                  created_at={article.created_at}
                  topic={article.topic}
                />
                <Link to={`/article/${article.article_id}`} className="link">
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
      )}
    </section>
  );
}

export default ArticleList;
