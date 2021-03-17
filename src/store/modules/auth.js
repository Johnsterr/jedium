import authApi from "@/api/auth";
import {setItem} from "@/utils/storageWorker";

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  signUpStart: "[auth] signUpStart",
  signUpSuccess: "[auth] signUpSuccess",
  signUpFailed: "[auth] signUpFailed",
};

const mutations = {
  // Registration is starting
  [mutationTypes.signUpStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  // Registration is Success
  [mutationTypes.signUpSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  // Validation Errors
  [mutationTypes.signUpFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

export const actionTypes = {
  signUp: "[auth] signUp",
};

const actions = {
  [actionTypes.signUp](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.signUpStart);
      authApi
        .signUp(credentials)
        .then(response => {
          context.commit(mutationTypes.signUpSuccess, response.data.user);
          setItem("accesToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.signUpFailed,
            result.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
