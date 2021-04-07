import axios from "./axios";

const signUp = credentials => {
  return axios.post("/users", {user: credentials});
};

const signIn = credentials => {
  return axios.post("/users/login", {user: credentials});
};

const getCurrentUser = () => {
  return axios.get("/user");
};

const updateCurrentUser = currentUserInput => {
  return axios
    .put("/user", {user: currentUserInput})
    .then(response => response.data.user);
};

export default {
  signUp,
  signIn,
  getCurrentUser,
  updateCurrentUser,
};
