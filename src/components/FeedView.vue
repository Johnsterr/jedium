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
        :total="total"
        :limit="limit"
        :current-page="currentPage"
        :url="url"
      ></feed-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {actionTypes} from "../store/modules/feed.js";
import FeedPagination from "./FeedPagination";

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
      total: 500,
      limit: 10,
      currentPage: 5,
      url: "/tags/dragons",
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl});
  },
};
</script>
