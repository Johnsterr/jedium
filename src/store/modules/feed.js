import feedApi from "@/api/feed";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getFeedStart: "[feed] Get feed start",
  getFeedSuccess: "[feed] Get feed success",
  getFeedFailed: "[feed] Get feed failed",
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getFeedFailed](state) {
    state.isLoading = false;
  },
};

export const actionTypes = {
  getFeed: "[feed] Get feed",
};

const actions = {
  [actionTypes.getFeed](context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getFeedStart);
      feedApi
        .getFeed(apiUrl)
        .then(response => {
          context.commit(mutationTypes.getFeedSuccess, response.data);
          resolve(response.data);
        })
        .catch(() => {
          context.commit(mutationTypes.getFeedFailed);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
