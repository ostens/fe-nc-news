import React, { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import "../App.css";
import { upArrow, downArrow, profile, comment } from "../icons";

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
  else
    return (
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <header>
                <section className="author">
                  <img
                    src={profile}
                    className="profile-icon"
                    alt="profile icon"
                  ></img>
                  <section className="author-details">
                    <h3>{article.author}</h3>
                    <p className="date-time">{article.created_at}</p>
                  </section>
                </section>
                <p className="pill">{article.topic}</p>
              </header>
              <h2>{article.title}</h2>
              <footer>
                <section className="votes">
                  <img src={upArrow} className="icon" alt="up arrow icon"></img>
                  <p>{article.votes}</p>
                  <img
                    src={downArrow}
                    className="icon"
                    alt="down arrow icon"
                  ></img>
                </section>
                <section className="comments">
                  <img
                    src={comment}
                    className="icon"
                    alt="speech bubble icon"
                  ></img>
                  <p>{article.comment_count}</p>
                </section>
              </footer>
            </li>
          );
        })}
      </ul>
    );
}

export default ArticleList;
