<template>
  <div>
    <SomeLoader v-if="isLoading"></SomeLoader>
    <ErrorMessage v-if="error"></ErrorMessage>
    <div v-if="articles.length === 0" class="article-preview">
      No articles are here... yet.
    </div>
  </div>
</template>

<script>
import {actionTypes} from "../store/modules/articles.js";
import SomeLoader from "./SomeLoader.vue";
import ErrorMessage from "./ErrorMessage.vue";

export default {
  name: "ArticleList",
  components: {
    SomeLoader,
    ErrorMessage,
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "all",
    },
    author: {
      type: String,
      required: false,
    },
    tag: {
      type: String,
      required: false,
    },
    favorited: {
      type: String,
      required: false,
    },
    articlesPerPage: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {},
  methods: {
    getArticles() {
      this.$store.dispatch(actionTypes.getArticle, {
        slug: this.$route.params.slug,
      });
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>
