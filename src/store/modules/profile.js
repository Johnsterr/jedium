import profileApi from "@/api/profile.js";

const state = {
  isLoading: false,
  isSubmitting: false,
  error: null,
  data: null,
};

export const PROFILE_ACTIONS = {
  getUserProfile: "[Profile] Get User Profile",
  userProfileFollow: "[Profile] Follow User",
  userProfileUnfollow: "[Profile] Unfollow User",
};

export const PROFILE_MUTATIONS = {
  // Получение данных профиля
  getUserProfileStart: "[Profile] Get User Profile Start",
  getUserProfileSuccess: "[Profile] Get User Profile Success",
  getUserProfileFailed: "[Profile] Get User Profile Failed",
  // Подписка на пользователя
  userProfileFollowingStart: "[Profile] User Profile Following Start",
  userProfileFollowingSuccess: "[Profile] User Profile Following Success",
  userProfileFollowingFailed: "[Profile] User Profile Following Failed",
  // Отписка от пользователя
  userProfileUnfollowingStart: "[Profile] User Profile Unfollowing Start",
  userProfileUnfollowingSuccess: "[Profile] User Profile Unfollowing Success",
  userProfileUnfollowingFailed: "[Profile] User Profile Unfollowing Failed",
};

const mutations = {
  // Данные профиля
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

  // Подписка
  [PROFILE_MUTATIONS.userProfileFollowingStart](state) {
    state.isSubmitting = true;
  },
  [PROFILE_MUTATIONS.userProfileFollowingSuccess](state, payload) {
    state.isSubmitting = false;
    state.data = payload;
  },
  [PROFILE_MUTATIONS.userProfileFollowingFailed](state) {
    state.isSubmitting = false;
  },

  // Отписка
  [PROFILE_MUTATIONS.userProfileUnfollowingStart](state) {
    state.isSubmitting = true;
  },
  [PROFILE_MUTATIONS.userProfileUnfollowingSuccess](state, payload) {
    state.isSubmitting = false;
    state.data = payload;
  },
  [PROFILE_MUTATIONS.userProfileUnfollowingFailed](state) {
    state.isSubmitting = false;
  },
};

const actions = {
  [PROFILE_ACTIONS.getUserProfile](context, {slug}) {
    return new Promise(resolve => {
      context.commit(PROFILE_MUTATIONS.getUserProfileStart);
      profileApi
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
      if (!isFollowing) {
        profileApi
          .userProfileFollow(slug)
          .then(userProfile => {
            context.commit(
              PROFILE_MUTATIONS.userProfileFollowingSuccess,
              userProfile
            );
            resolve(userProfile);
          })
          .catch(() => {
            context.commit(PROFILE_MUTATIONS.userProfileFollowingFailed);
          });
      }
    });
  },

  [PROFILE_ACTIONS.userProfileUnfollow](context, {slug, isFollowing}) {
    return new Promise(resolve => {
      context.commit(PROFILE_MUTATIONS.userProfileUnfollowingStart);
      if (isFollowing) {
        profileApi
          .userProfileUnfollow(slug)
          .then(userProfile => {
            context.commit(
              PROFILE_MUTATIONS.userProfileUnfollowingSuccess,
              userProfile
            );
            resolve(userProfile);
          })
          .catch(() => {
            context.commit(PROFILE_MUTATIONS.userProfileUnfollowingFailed);
          });
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
