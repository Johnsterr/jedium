import authApi from "@/api/auth";
import {setItem} from "@/utils/storageWorker";

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

const mutations = {
  // Registration is starting
  signUpStart(state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  // Registration is Success
  signUpSuccess(state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  // Validation Errors
  signUpFailed(state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  signUp(context, credentials) {
    return new Promise(resolve => {
      context.commit("signUpStart");
      authApi
        .signUp(credentials)
        .then(response => {
          context.commit("signUpSuccess", response.data.user);
          setItem("accesToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit("signUpFailed", result.response.data.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
