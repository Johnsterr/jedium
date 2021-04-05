import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth.js";
import feed from "./modules/feed.js";
import popularTags from "./modules/popularTags.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth, // auth: auth
    feed,
    popularTags,
  },
});
