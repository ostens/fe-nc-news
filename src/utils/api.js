import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://frantic-erin-ant.cyclic.app/api",
});

export const fetchArticles = (topic, sort_by, order) => {
  return ncNewsApi
    .get("/articles", { params: { topic, sort_by, order } })
    .then(({ data: { articles } }) => {
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

export const postComment = (id, author, body) => {
  return ncNewsApi
    .post(`/articles/${id}/comments`, {
      username: author,
      body: body,
    })
    .then(({ data: { comment } }) => comment);
};

export const fetchTopics = () => {
  return ncNewsApi.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
};

export const deleteComment = (id) => {
  return ncNewsApi.delete(`/comments/${id}`);
};
