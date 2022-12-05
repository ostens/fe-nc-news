import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://frantic-erin-ant.cyclic.app/api",
});

export const fetchArticles = () => {
  return ncNewsApi.get("/articles").then(({ data: { articles } }) => {
    return articles;
  });
};
