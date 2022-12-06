import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://frantic-erin-ant.cyclic.app/api",
});

export const fetchArticles = () => {
  return ncNewsApi.get("/articles").then(({ data: { articles } }) => {
    return articles;
  });
};

export const fetchArticle = (id) => {
  return ncNewsApi.get(`/articles/${id}`).then(({ data: { article } }) => {
    return article;
  });
};

export const fetchCommentsByArticleId = (id) => {
  return ncNewsApi
    .get(`/articles/${id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const voteById = (id, votes, article = true) => {
  return ncNewsApi.patch(article ? `/articles/${id}` : `/comments/${id}`, {
    inc_votes: votes,
  });
};
