import articlesApi from "@/api/articles.js";

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

export const mutationTypes = {
  editArticleStart: "[Edit Article] Edit Article start",
  editArticleSuccess: "[Edit Article] Edit Article success",
  editArticleFailed: "[Edit Article] Edit Article failed",

  getArticleStart: "[Edit Article] Get Article start",
  getArticleSuccess: "[Edit Article] Get Article success",
  getArticleFailed: "[Edit Article] Get Article failed",
};

const mutations = {
  [mutationTypes.editArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.editArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.editArticleFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailed](state) {
    state.isLoading = false;
  },
};

export const actionTypes = {
  editArticle: "[Edit Article] Edit Article",
  getArticle: "[Edit Article] Get Article",
};

const actions = {
  [actionTypes.editArticle](context, {slug, articleInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.editArticleStart);
      articlesApi
        .editArticle(slug, articleInput)
        .then(article => {
          context.commit(mutationTypes.editArticleSuccess, article);
          resolve(article);
        })
        .catch(result => {
          context.commit(
            mutationTypes.editArticleFailed,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArticleStart);
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
