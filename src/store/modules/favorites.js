import favoritesApi from "@/api/favorites.js";
import {FAVORITES_ACTIONS} from "../actions.type.js";
import {FAVORITES_MUTATIONS} from "../mutations.type.js";

const mutations = {
  [FAVORITES_MUTATIONS.addToFavoritesStart]() {},
  [FAVORITES_MUTATIONS.addToFavoritesSuccess](state, payload) {
    state.data = payload;
  },
  [FAVORITES_MUTATIONS.addToFavoritesFailed]() {},
};

const actions = {
  [FAVORITES_ACTIONS.addToFavorites](context, {slug, isFavorited}) {
    return new Promise(resolve => {
      context.commit(FAVORITES_MUTATIONS.addToFavoritesStart);
      const promise = isFavorited
        ? favoritesApi.removeFromFavorites(slug)
        : favoritesApi.addToFavorites(slug);
      promise
        .then(article => {
          context.commit(FAVORITES_MUTATIONS.addToFavoritesSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(FAVORITES_MUTATIONS.addToFavoritesFailed);
        });
    });
  },
};

export default {
  mutations,
  actions,
};
