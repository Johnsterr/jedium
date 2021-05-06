import authApi from "@/api/auth.js";
import {setItem, destroyToken} from "@/api/token.js";

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const AUTH_MUTATIONS = {
  // Регистрация
  registerStart: "[Auth] Registration Start",
  registerSuccess: "[Auth] Registration Success",
  registerFailed: "[Auth] Registration Failed",
  // Авторизация
  loginStart: "[Auth] Login Start",
  loginSuccess: "[Auth] Login Success",
  loginFailed: "[Auth] Login Failed",
  // Получение данных о пользователе
  getCurrentUserStart: "[Auth] Get Current User Start",
  getCurrentUserSuccess: "[Auth] Get Current User Success",
  getCurrentUserFailed: "[Auth] Get Current User Failed",
  // Обновление информации о пользователе
  updateCurrentUserStart: "[Auth] Update Current User Start",
  updateCurrentUserSuccess: "[Auth] Update Current User Success",
  updateCurrentUserFailed: "[Auth] Update Current User Failed",
  // Выход из системы
  logout: "[Auth] Logout (Mutation)",
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

export const AUTH_ACTIONS = {
  register: "[Auth] Register",
  login: "[Auth] Login",
  logout: "[Auth] Logout (Action)",
  getCurrentUser: "[Auth] Get Current User",
  updateCurrentUser: "[Auth] Update Current User",
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

export const AUTH_GETTERS = {
  currentUser: "[Auth] Current User",
  isLoggedIn: "[Auth] User isLoggedIn",
  isAnonymous: "[Auth] User isAnonymous",
};

const getters = {
  // Текущий пользователь
  [AUTH_GETTERS.currentUser]: state => {
    return state.currentUser;
  },
  // Пользователь вошел в систему
  [AUTH_GETTERS.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn);
  },
  // Пользователь не вошел в систему
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
