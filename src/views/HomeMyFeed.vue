<template>
  <div class="home-my-feed"><ArticleList type="feed"></ArticleList></div>
</template>

<script>
import ArticleList from "../components/ArticleList.vue";

export default {
  name: "HomeMyFeed",
  components: {
    ArticleList,
  },
};
</script>
