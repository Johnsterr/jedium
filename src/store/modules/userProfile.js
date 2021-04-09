import userProfileApi from "@/api/userProfile.js";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getUserProfileStart: "[UserProfile] Get UserProfile start",
  getUserProfileSuccess: "[UserProfile] Get UserProfile success",
  getUserProfileFailed: "[UserProfile] Get UserProfile failed",
};

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getUserProfileFailed](state) {
    state.isLoading = false;
  },
};

export const actionTypes = {
  getUserProfile: "[UserProfile] Get UserProfile",
};

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getUserProfileStart);
      userProfileApi
        .getUserProfile(slug)
        .then(userProfile => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile);
          resolve(userProfile);
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailed);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
