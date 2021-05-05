import articlesApi from "@/api/articles.js";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  // All Articles
  fetchArticlesStart: "[Articles] Fetch Articles Start",
  fetchArticlesSuccess: "[Articles] Fetch Articles Success",
  fetchArticlesFailed: "[Articles] Fetch Articles Failed",
  // Article
  getArticleStart: "[Articles] Get Article start",
  getArticleSuccess: "[Articles] Get Article success",
  getArticleFailed: "[Articles] Get Article failed",
  deleteArticleStart: "[Articles] Delete Article start",
  deleteArticleSuccess: "[Articles] Delete Article success",
  deleteArticleFailed: "[Articles] Delete Article failed",
};

const mutations = {
  // All Articles
  [mutationTypes.fetchArticlesStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.fetchArticlesSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.fetchArticlesFailed](state) {
    state.isLoading = false;
  },
  // Article
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
  // Удаление поста
  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailed]() {},
};

export const actionTypes = {
  // All Articles
  fetchArticles: "[Articles] Get Articles",

  getArticle: "[Articles] Get Article",
  deleteArticle: "[Articles] Delete Article",
};

const actions = {
  [actionTypes.fetchArticles](context, params) {
    return new Promise(resolve => {
      context.commit(mutationTypes.fetchArticlesStart);
      articlesApi
        .fetchArticles(params.type, params.filters)
        .then(response => {
          context.commit(mutationTypes.fetchArticlesSuccess, response.data);
          resolve(response.data);
        })
        .catch(() => {
          context.commit(mutationTypes.fetchArticlesFailed);
        });
    });
  },

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
  [actionTypes.deleteArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteArticleStart, slug);
      articlesApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleSuccess);
          resolve();
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailed);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
