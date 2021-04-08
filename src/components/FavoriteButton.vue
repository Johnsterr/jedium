<template>
  <button class="btn btn-sm btn-outline-primary">
    <i class="ion-heart"></i> &nbsp;
    <span class="counter">{{ article.favoritesCount }}</span>
  </button>
</template>

<script>
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
};
</script>
