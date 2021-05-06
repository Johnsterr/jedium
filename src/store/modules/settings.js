import {AUTH_MUTATIONS as SETTINGS_MUTATIONS} from "./auth.js";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

const mutations = {
  // Обновление настроек пользователя
  [SETTINGS_MUTATIONS.updateCurrentUserStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [SETTINGS_MUTATIONS.updateCurrentUserSuccess](state) {
    state.isSubmitting = false;
  },
  [SETTINGS_MUTATIONS.updateCurrentUserFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

export default {
  state,
  mutations,
};
