import axios from "@/api/axios.js";

const getUserProfile = slug => {
  return axios.get(`/profiles/${slug}`).then(response => response.data.profile);
};

const userProfileFollow = slug => {
  return axios
    .post(`/profiles/${slug}/follow`)
    .then(response => response.data.profile);
};

const userProfileUnfollow = slug => {
  return axios
    .delete(`/profiles/${slug}/follow`)
    .then(response => response.data.profile);
};

export default {
  getUserProfile,
  userProfileFollow,
  userProfileUnfollow,
};
