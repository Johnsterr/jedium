<template>
  <div class="home-global"><ArticleList type="all"></ArticleList></div>
</template>

<script>
import ArticleList from "../components/ArticleList.vue";

export default {
  name: "HomeGlobal",
  components: {
    ArticleList,
  },
};
</script>
