import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth.js";
import feed from "./modules/feed.js";
import popularTags from "./modules/popularTags.js";
import articles from "./modules/articles.js";
import createArticle from "./modules/createArticle.js";
import editArticle from "./modules/editArticle.js";
import settings from "./modules/settings.js";
import favorites from "./modules/favorites.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth, // auth: auth
    feed,
    popularTags,
    articles,
    createArticle,
    editArticle,
    settings,
    favorites,
  },
});
