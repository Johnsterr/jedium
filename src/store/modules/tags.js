import tagsApi from "@/api/tags";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const TAGS_ACTION = {
  getPopularTags: "[Tags] Get Popular Tags",
};

export const mutationTypes = {
  getPopularTagsStart: "[PopularTags] Get PopularTags start",
  getPopularTagsSuccess: "[PopularTags] Get PopularTags success",
  getPopularTagsFailed: "[PopularTags] Get PopularTags failed",
};

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getPopularTagsFailed](state) {
    state.isLoading = false;
  },
};

const actions = {
  [TAGS_ACTION.getPopularTags](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getPopularTagsStart);
      tagsApi
        .getPopularTags()
        .then(tags => {
          context.commit(mutationTypes.getPopularTagsSuccess, tags);
          resolve(tags);
        })
        .catch(() => {
          context.commit(mutationTypes.getPopularTagsFailed);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
