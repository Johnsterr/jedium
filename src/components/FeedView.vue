<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad...</div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" alt="ava" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <button class="btn btn-sm pull-xs-right btn-outline-primary">
            <i class="ion-heart"></i> &nbsp; <span class="counter">0</span>
          </button>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
        </router-link>
      </div>
      <feed-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      ></feed-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {actionTypes} from "../store/modules/feed.js";
import FeedPagination from "./FeedPagination";
import {limit} from "../utils/vars.js";

export default {
  name: "FeedView",
  components: {
    FeedPagination,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      limit,
      url: "/tags/dragons",
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || "1");
    },
    baseUrl() {
      return this.$route.path;
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl});
  },
};
</script>
