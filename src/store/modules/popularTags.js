import popularTagsApi from "@/api/tags";

const state = {
  data: null,
  isLoading: false,
  error: null,
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

export const actionTypes = {
  getPopularTags: "[PopularTags] Get PopularTags",
};

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getPopularTagsStart);
      popularTagsApi
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
