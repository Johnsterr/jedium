import authApi from "@/api/auth.js";
import {setItem, destroyToken} from "@/api/token.js";
import {AUTH_ACTIONS} from "../actions.type.js";
import {AUTH_GETTERS} from '../getters.type.js';

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  // Регистрация
  RegisterStart: "[Auth] Registration Start...",
  RegisterSuccess: "[Auth] Registration Success",
  RegisterFailed: "[Auth] Registration Failed",
  // Авторизация
  signInStart: "[Auth] signInStart",
  signInSuccess: "[Auth] signInSuccess",
  signInFailed: "[Auth] signInFailed",
  // Получение данных о пользователе
  getCurrentUserStart: "[Auth] getCurrentUserStart",
  getCurrentUserSuccess: "[Auth] getCurrentUserSuccess",
  getCurrentUserFailed: "[Auth] getCurrentUserFailed",
  // Обновление информации о пользователе
  updateCurrentUserStart: "[Auth] updateCurrentUserStart",
  updateCurrentUserSuccess: "[Auth] updateCurrentUserSuccess",
  updateCurrentUserFailed: "[Auth] updateCurrentUserFailed",
  // Выход
  logout: "[Auth] Logout",
};

const mutations = {
  // Registration is starting
  [mutationTypes.RegisterStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  // Registration is Success
  [mutationTypes.RegisterSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  // Registration Validation Errors
  [mutationTypes.RegisterFailed](state, payload) {
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
  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = null;
    state.currentUser = payload;
  },
  [mutationTypes.updateCurrentUserFailed]() {},
  [mutationTypes.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
  },
};

const actions = {
  // Регистрация
  [AUTH_ACTIONS.register](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.RegisterStart);
      authApi
        .register(credentials)
        .then(response => {
          context.commit(mutationTypes.RegisterSuccess, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.RegisterFailed,
            result.response.data.errors
          );
        });
    });
  },
  // Авторизация
  [AUTH_ACTIONS.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.signInStart);
      authApi
        .login(credentials)
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
  // Получение данных пользователя
  [AUTH_ACTIONS.getCurrentUser](context) {
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
  // Обновление информации пользователя
  [AUTH_ACTIONS.updateCurrentUser](context, {currentUserInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateCurrentUserStart);
      authApi
        .updateCurrentUser(currentUserInput)
        .then(user => {
          context.commit(mutationTypes.updateCurrentUserSuccess, user);
          resolve(user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.updateCurrentUserFailed,
            result.response.data.errors
          );
        });
    });
  },
  // Выход из системы
  [AUTH_ACTIONS.logout](context) {
    return new Promise(resolve => {
      destroyToken("accessToken");
      context.commit(mutationTypes.logout);
      resolve();
    });
  },
};

const getters = {
  [AUTH_GETTERS.currentUser]: state => {
    return state.currentUser;
  },
  [AUTH_GETTERS.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn);
  },
  [AUTH_GETTERS.isAnonymous]: state => {
    return state.isLoggedIn === false;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
