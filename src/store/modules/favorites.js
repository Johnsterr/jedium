import favoritesApi from "@/api/favorites.js";

export const mutationTypes = {
  addToFavoritesStart: "[favorites] Add to favorites start",
  addToFavoritesSuccess: "[favorites] Add to favorites success",
  addToFavoritesFailed: "[favorites] Add to favorites failed",
};

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailed]() {},
};

export const actionTypes = {
  addToFavorites: "[favorites] Add to favorites",
};

const actions = {
  [actionTypes.addToFavorites](context, {slug, isFavorited}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addToFavoritesStart);
      const promise = isFavorited
        ? favoritesApi.removeFromFavorites(slug)
        : favoritesApi.addToFavorites(slug);
      promise
        .then(article => {
          context.commit(mutationTypes.addToFavoritesSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavoritesFailed);
        });
    });
  },
};

export default {
  mutations,
  actions,
};
