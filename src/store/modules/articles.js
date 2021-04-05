import articlesApi from "@/api/articles.js";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticleStart: "[Articles] Get Article start",
  getArticleSuccess: "[Articles] Get Article success",
  getArticleFailed: "[Articles] Get Article failed",
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArticleFailed](state) {
    state.isLoading = false;
  },
};

export const actionTypes = {
  getArticle: "[Articles] Get Article",
};

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArticleStart, slug);
      articlesApi
        .getArticle(slug)
        .then(article => {
          context.commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailed);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
