import React, { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import TopicNav from "./TopicNav";
import ErrorPage from "./ErrorPage";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const { topic, sort_by } = useParams();

  useEffect(() => {
    fetchArticles(topic, sort_by, order)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  }, [topic, sort_by, order]);

  if (error) return <ErrorPage msg={error} />;
  return (
    <section>
      <TopicNav
        selectedTopic={topic}
        selectedSort={sort_by}
        order={order}
        setOrder={setOrder}
      />
      {isLoading ? (
        <p>Getting your articles...</p>
      ) : (
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.article_id} className="card">
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
