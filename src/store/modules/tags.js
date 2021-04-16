import popularTagsApi from "@/api/tags";
import {TAGS_ACTION} from "../actions.type.js";

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

const actions = {
  [TAGS_ACTION.getPopularTags](context) {
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
