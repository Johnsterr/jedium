const state = {
  isSubmitting: false,
};

const mutations = {
  signUpStart(state) {
    state.isSubmitting = true;
  },
};

export default {
  state,
  mutations,
};
