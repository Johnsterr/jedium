import authApi from "@/api/auth";
import {setItem} from "@/utils/storageWorker";

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  signUpStart: "[auth] signUpStart",
  signUpSuccess: "[auth] signUpSuccess",
  signUpFailed: "[auth] signUpFailed",
  signInStart: "[auth] signInStart",
  signInSuccess: "[auth] signInSuccess",
  signInFailed: "[auth] signInFailed",
  getCurrentUserStart: "[auth] getCurrentUserStart",
  getCurrentUserSuccess: "[auth] getCurrentUserSuccess",
  getCurrentUserFailed: "[auth] getCurrentUserFailed",
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
  // Registration Validation Errors
  [mutationTypes.signUpFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  // Login is starting
  [mutationTypes.signInStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  // Login is Success
  [mutationTypes.signInSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  // Login Validation Errors
  [mutationTypes.signInFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  // getCurrentUser is starting
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  // getCurrentUser is Success
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  // getCurrentUser Validation Errors
  [mutationTypes.getCurrentUserFailed](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
};

export const actionTypes = {
  signUp: "[auth] signUp",
  signIn: "[auth] signIn",
  getCurrentUser: "[auth] getCurrentUser",
};

const actions = {
  [actionTypes.signUp](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.signUpStart);
      authApi
        .signUp(credentials)
        .then(response => {
          context.commit(mutationTypes.signUpSuccess, response.data.user);
          setItem("accessToken", response.data.user.token);
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
  [actionTypes.signIn](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.signInStart);
      authApi
        .signIn(credentials)
        .then(response => {
          context.commit(mutationTypes.signInSuccess, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.signInFailed,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then(response => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          );
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailed);
        });
    });
  },
};

export const gettersTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth] isAnonymous",
};

const getters = {
  [gettersTypes.currentUser]: state => {
    return state.currentUser;
  },
  [gettersTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn);
  },
  [gettersTypes.isAnonymous]: state => {
    return state.isLoggedIn === false;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
