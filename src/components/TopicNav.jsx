import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../utils/api";
import { close } from "../icons";
import { useViewport } from "../hooks/UseViewport";

function TopicNav({ selectedTopic }) {
  const [topics, setTopics] = useState([]);
  const { width, breakpoint } = useViewport();

  useEffect(() => {
    fetchTopics().then((topics) => setTopics(topics));
  }, []);

  return (
    <section className="topic-nav">
      {topics.map((topic) => (
        <Link
          to={`/articles/${topic.slug}`}
          value={topic.slug}
          key={topic.slug}
          className={`topic ${
            topic.slug === selectedTopic ? "selected" : null
          }`}
        >
          {topic.slug}
        </Link>
      ))}
      <Link to={"/"} value="X" className="link">
        <img src={close} alt="close icon" className="icon" />
        {width > breakpoint ? <p>Remove filter</p> : null}
      </Link>
    </section>
  );
}

export default TopicNav;
