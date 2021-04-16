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

export const PROFILE_MUTATIONS = {
  // Получение данных профиля
  getUserProfileStart: "[Profile] Get User Profile Start",
  getUserProfileSuccess: "[Profile] Get User Profile Success",
  getUserProfileFailed: "[Profile] Get User Profile Failed",
  // Отслеживание пользователя
  userProfileFollowingStart: "[Profile] User Profile Following Start",
  userProfileFollowingSuccess: "[Profile] User Profile Following Success",
  userProfileFollowingFailed: "[Profile] User Profile Following Failed",
};
