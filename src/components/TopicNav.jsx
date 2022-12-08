import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../utils/api";
import { close } from "../icons";
import { useViewport } from "../hooks/UseViewport";
import { calendar, ascending, votes, comment } from "../icons";

function TopicNav({ selectedTopic, selectedSort, order, setOrder }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width, breakpoint } = useViewport();

  const sortOptions = [
    { slug: "created_at", display: "Created", icon: calendar },
    { slug: "votes", display: "Votes", icon: votes },
    { slug: "comment_count", display: "Comments", icon: comment },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    setOrder((order) => (order ? null : "asc"));
  };

  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Getting available topics...</p>;
  return (
    <section className="filter-nav">
      <section className="topic-nav">
        {topics.map((topic) => (
          <Link
            to={`/articles/t/${topic.slug}`}
            value={topic.slug}
            key={topic.slug}
            className={`topic ${
              topic.slug === selectedTopic ? "selected" : null
            }`}
          >
            {topic.slug}
          </Link>
        ))}
        <Link to={"/articles"} value="X" className="link">
          <img src={close} alt="close icon" className="icon" />
          {width > breakpoint ? <p>Remove filter</p> : null}
        </Link>
      </section>
      <section id="hidden-background">
        <button
          onClick={handleClick}
          className={`sort ${order === "asc" ? "selected" : null}`}
        >
          <img
            className={`icon ${order === "asc" ? null : "rotate"}`}
            alt="sort icon"
            src={ascending}
          />
          {order ? "Asc" : "Desc"}
        </button>
        {sortOptions.map((sort, index) => {
          return (
            <Link
              to={
                selectedTopic
                  ? `/articles/t/${selectedTopic}/${sort.slug}`
                  : `/articles/${sort.slug}`
              }
              value={sort.slug}
              key={index}
              className={`sort ${
                selectedSort === sort.slug ? "selected" : null
              }`}
            >
              <section className="sort-pill">
                <img src={sort.icon} className="icon" alt="sort icon" />
                {width > breakpoint ? sort.display : null}
              </section>
            </Link>
          );
        })}
      </section>
    </section>
  );
}

export default TopicNav;
