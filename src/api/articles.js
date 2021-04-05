import axios from "./axios.js";

const getArticle = slug => {
  return axios.get(`/articles/${slug}`).then(response => response.data.article);
};

export default {
  getArticle,
};
