<template>
  <button
    @click="handleLike"
    class="btn btn-sm"
    :class="{
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic,
    }"
  >
    <i class="ion-heart"></i>
    <span class="counter">&nbsp;{{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import {actionTypes} from "../store/modules/favorites.js";

export default {
  name: "FavoriteButton",
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    };
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavorited,
      });
      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic -= 1;
      } else {
        this.favoritesCountOptimistic += 1;
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic;
    },
  },
};
</script>
