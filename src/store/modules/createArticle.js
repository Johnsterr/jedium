import articlesApi from "@/api/articles.js";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  createArticleStart: "[CreateArticle] Create Article start",
  createArticleSuccess: "[CreateArticle] Create Article success",
  createArticleFailed: "[CreateArticle] Create Article failed",
};

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.createArticleFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

export const actionTypes = {
  createArticle: "[CreateArticle] Create Article",
};

const actions = {
  [actionTypes.createArticle](context, {articleInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createArticleStart);
      articlesApi
        .createArticle(articleInput)
        .then(article => {
          context.commit(mutationTypes.createArticleSuccess, article);
          resolve(article);
        })
        .catch(result => {
          context.commit(
            mutationTypes.createArticleFailed,
            result.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
