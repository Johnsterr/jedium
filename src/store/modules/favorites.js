import favoritesApi from "@/api/favorites.js";

export const FAVORITES_ACTIONS = {
  addToFavorites: "[Favorites] Add to Favorites",
};

export const FAVORITES_MUTATIONS = {
  // Отслеживание поста
  addToFavoritesStart: "[Favorites] Add to Favorites Start",
  addToFavoritesSuccess: "[Favorites] Add to Favorites Success",
  addToFavoritesFailed: "[Favorites] Add to Favorites Failed",
};

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
