import axios from "./axios";

const signUp = credentials => {
  return axios.post("/users", {user: credentials});
};

export default {
  signUp,
};
