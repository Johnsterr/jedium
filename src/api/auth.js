import axios from "./axios";

const signUp = credentials => {
  return axios.post("/users", {user: credentials});
};

const signIn = credentials => {
  return axios.post("/users/login", {user: credentials});
};

export default {
  signUp,
  signIn,
};
