<template>
  <div>
    <some-loader v-if="isLoading"></some-loader>
    <error-message v-if="error"></error-message>
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
          <div class="pull-xs-right">
            <favorite-button
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            ></favorite-button>
          </div>
        </div>
        <router-link
          :to="{name: 'articles', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <tag-list :tags="article.tagList"></tag-list>
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
import {stringify, parseUrl} from "query-string";
import {actionTypes} from "../store/modules/feed.js";
import {limit} from "../utils/vars.js";
import FeedPagination from "./FeedPagination.vue";
import SomeLoader from "./SomeLoader.vue";
import ErrorMessage from "./ErrorMessage.vue";
import TagList from "./TagList.vue";
import FavoriteButton from "./FavoriteButton.vue";

export default {
  name: "FeedView",
  components: {
    FeedPagination,
    SomeLoader,
    ErrorMessage,
    TagList,
    FavoriteButton,
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
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parseUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams});
    },
  },
};
</script>
