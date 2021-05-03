<template>
  <div class="home-tag"><ArticleList :tag="tag"></ArticleList></div>
</template>

<script>
import ArticleList from "../components/ArticleList.vue";

export default {
  name: "HomeTagFeed",
  components: {
    ArticleList,
  },
  computed: {
    tag() {
      return this.$route.params.slug;
    },
  },
};
</script>
