<template>
  <div>
    <SomeLoader v-if="isLoading"></SomeLoader>
    <ErrorMessage v-if="error"></ErrorMessage>
    <div v-if="data">
      <div v-if="data.articles.length === 0" class="article-preview">
        Постов пока еще нет...
      </div>
      <ArticlePreview
        v-for="(article, index) in data.articles"
        :article="article"
        :key="article.title + index"
      ></ArticlePreview>
      <FeedPagination
        :pages="pages"
        :currentPage.sync="currentPage"
      ></FeedPagination>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {actionTypes} from "../store/modules/articles.js";

import ArticlePreview from "../components/ArticlePreview";
import FeedPagination from "../components/FeedPagination.vue";

export default {
  name: "ArticleList",
  components: {
    ArticlePreview,
    FeedPagination,
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
  computed: {
    ...mapState({
      isLoading: (state) => state.articles.isLoading,
      error: (state) => state.articles.error,
      data: (state) => state.articles.data,
    }),
    paramsConfig() {
      const {type} = this;
      const filters = {
        offset: this.currentPage * this.articlesPerPage - this.articlesPerPage,
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
        type,
        filters,
      };
    },
    pages() {
      if (this.isLoading || this.data.articlesCount <= this.articlesPerPage) {
        return [];
      }
      return [
        ...Array(
          Math.ceil(this.data.articlesCount / this.articlesPerPage)
        ).keys(),
      ].map((e) => e + 1);
    },
  },
  watch: {
    currentPage(newPage) {
      this.paramsConfig.filters.offset = (newPage - 1) * this.articlesPerPage;
      this.fetchArticles();
    },
    type() {
      this.resetPagination();
      this.fetchArticles();
    },
    author() {
      this.resetPagination();
      this.fetchArticles();
    },
    tag() {
      this.resetPagination();
      this.fetchArticles();
    },
    favorited() {
      this.resetPagination();
      this.fetchArticles();
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
