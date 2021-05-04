import axios from "@/api/axios.js";

// Fetch All Articles
const fetchArticles = (type, params) => {
  return axios.get("/articles" + (type === "feed" ? "/feed" : ""), {
    params: params,
  });
};

const getArticle = slug => {
  return axios.get(`/articles/${slug}`).then(response => response.data.article);
};

const deleteArticle = slug => {
  return axios.delete(`/articles/${slug}`);
};

const createArticle = articleInput => {
  return axios
    .post("/articles", {article: articleInput})
    .then(response => response.data.article);
};

const editArticle = (slug, articleInput) => {
  return axios
    .put(`/articles/${slug}`, {article: articleInput})
    .then(response => response.data.article);
};

export default {
  fetchArticles,
  getArticle,
  deleteArticle,
  createArticle,
  editArticle,
};
