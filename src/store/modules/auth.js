import authApi from "@/api/auth.js";
import {setItem, destroyToken} from "@/api/token.js";
import {AUTH_ACTIONS} from "../actions.type.js";
import {AUTH_GETTERS} from "../getters.type.js";
import {AUTH_MUTATIONS} from "../mutations.type.js";

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

const mutations = {
  // Регистрация
  [AUTH_MUTATIONS.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [AUTH_MUTATIONS.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [AUTH_MUTATIONS.registerFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  // Авторизация
  [AUTH_MUTATIONS.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [AUTH_MUTATIONS.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [AUTH_MUTATIONS.loginFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  // Получение данных о пользователе
  [AUTH_MUTATIONS.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [AUTH_MUTATIONS.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [AUTH_MUTATIONS.getCurrentUserFailed](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },

  // Обновление данных пользователя
  [AUTH_MUTATIONS.updateCurrentUserStart]() {},
  [AUTH_MUTATIONS.updateCurrentUserSuccess](state, payload) {
    state.currentUser = null;
    state.currentUser = payload;
  },
  [AUTH_MUTATIONS.updateCurrentUserFailed]() {},

  // Выход из системы
  [AUTH_MUTATIONS.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
  },
};

const actions = {
  // Регистрация
  [AUTH_ACTIONS.register](context, credentials) {
    return new Promise(resolve => {
      context.commit(AUTH_MUTATIONS.registerStart);
      authApi
        .register(credentials)
        .then(response => {
          context.commit(AUTH_MUTATIONS.registerSuccess, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            AUTH_MUTATIONS.registerFailed,
            result.response.data.errors
          );
        });
    });
  },
  // Авторизация
  [AUTH_ACTIONS.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(AUTH_MUTATIONS.loginStart);
      authApi
        .login(credentials)
        .then(response => {
          context.commit(AUTH_MUTATIONS.loginSuccess, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            AUTH_MUTATIONS.loginFailed,
            result.response.data.errors
          );
        });
    });
  },
  // Получение данных пользователя
  [AUTH_ACTIONS.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(AUTH_MUTATIONS.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then(response => {
          context.commit(
            AUTH_MUTATIONS.getCurrentUserSuccess,
            response.data.user
          );
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(AUTH_MUTATIONS.getCurrentUserFailed);
        });
    });
  },
  // Обновление информации пользователя
  [AUTH_ACTIONS.updateCurrentUser](context, {currentUserInput}) {
    return new Promise(resolve => {
      context.commit(AUTH_MUTATIONS.updateCurrentUserStart);
      authApi
        .updateCurrentUser(currentUserInput)
        .then(user => {
          context.commit(AUTH_MUTATIONS.updateCurrentUserSuccess, user);
          resolve(user);
        })
        .catch(result => {
          context.commit(
            AUTH_MUTATIONS.updateCurrentUserFailed,
            result.response.data.errors
          );
        });
    });
  },
  // Выход из системы
  [AUTH_ACTIONS.logout](context) {
    return new Promise(resolve => {
      destroyToken("accessToken");
      context.commit(AUTH_MUTATIONS.logout);
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
