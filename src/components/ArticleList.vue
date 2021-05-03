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
import {mapState} from "vuex";
import {stringify, parseUrl} from "query-string";
import {actionTypes} from "../store/modules/articles.js";
import SomeLoader from "./SomeLoader.vue";
import ErrorMessage from "./ErrorMessage.vue";
import {limit} from "../utils/vars.js";

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
    url: {
      type: String,
      required: false,
      default: "/articles",
    },
  },
  data() {
    return {
      limit: 1,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.articles.isLoading,
      error: (state) => state.articles.error,
      articles: (state) => state.articles.data,
    }),
    paramsConfig() {
      const {type} = this;
      const apiUrl = this.url;
      const filters = {
        offset: (this.currentPage - 1) * this.articlesPerPage,
        limit: this.articlesPerPage,
      };
      if (this.author) {
        filters.author = this.author;
      }
      if (this.tag) {
        filters.tag = this.tag;
      }
      if (this.favorited) {
        filters.favorited = this.favorited;
      }
      return {
        apiUrl,
        type,
        filters,
      };
    },
    currentPage() {
      return Number(this.$route.query.page || "1");
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch(actionTypes.fetchArticles, this.paramsConfig);
    },
    resetPagination() {
      this.paramsConfig.offset = 0;
      this.currentPage = 1;
    },
  },
  mounted() {
    this.fetchArticles();
  },
};
</script>
