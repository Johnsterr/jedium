import userProfileApi from "@/api/userProfile.js";
import {PROFILE_ACTIONS} from "../actions.type.js";
import {PROFILE_MUTATIONS} from "../mutations.type.js";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

const mutations = {
  [PROFILE_MUTATIONS.getUserProfileStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [PROFILE_MUTATIONS.getUserProfileSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [PROFILE_MUTATIONS.getUserProfileFailed](state) {
    state.isLoading = false;
  },

  [PROFILE_MUTATIONS.userProfileFollowingStart]() {},
  [PROFILE_MUTATIONS.userProfileFollowingSuccess](state, payload) {
    state.data = payload;
  },
  [PROFILE_MUTATIONS.userProfileFollowingFailed]() {},
};

const actions = {
  [PROFILE_ACTIONS.getUserProfile](context, {slug}) {
    return new Promise(resolve => {
      context.commit(PROFILE_MUTATIONS.getUserProfileStart);
      userProfileApi
        .getUserProfile(slug)
        .then(userProfile => {
          context.commit(PROFILE_MUTATIONS.getUserProfileSuccess, userProfile);
          resolve(userProfile);
        })
        .catch(() => {
          context.commit(PROFILE_MUTATIONS.getUserProfileFailed);
        });
    });
  },

  [PROFILE_ACTIONS.userProfileFollow](context, {slug, isFollowing}) {
    return new Promise(resolve => {
      context.commit(PROFILE_MUTATIONS.userProfileFollowingStart);
      const promise = isFollowing
        ? userProfileApi.userProfileUnfollow(slug)
        : userProfileApi.userProfileFollow(slug);
      promise
        .then(userProfile => {
          context.commit(
            PROFILE_MUTATIONS.userProfileFollowingSuccess,
            userProfile
          );
          resolve(userProfile);
        })
        .catch(() => {
          context.commit(PROFILE_MUTATIONS.userProfileFollowingStart);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
