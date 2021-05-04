<template>
  <div class="article-meta">
    <router-link
      :to="{name: 'profile', params: {username: article.author.username}}"
    >
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{name: 'profile', params: {username: article.author.username}}"
        class="author"
      >
        {{ article.author.username }}
      </router-link>
      <span class="date">{{ article.createdAt | date }}</span>
    </div>
    <article-actions
      v-if="actions"
      :article="article"
      :is-author="isCurrentUser"
    ></article-actions>
    <button
      v-else
      class="btn btn-sm pull-xs-right"
      @click.prevent="toggleFavorite"
      :class="{
        'btn-primary': article.favorited,
        'btn-outline-primary': !article.favorited,
      }"
    >
      <i class="ion-heart"></i>
      <span class="counter"> {{ article.favoritesCount }} </span>
    </button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {AUTH_GETTERS} from "../store/getters.type.js";
import {FAVORITES_ACTIONS} from "../store/modules/favorites.js";

import ArticleActions from "../components/ArticleActions.vue";

export default {
  name: "ArticleMeta",
  components: {
    ArticleActions,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
    actions: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: AUTH_GETTERS.currentUser,
      isLoggedIn: AUTH_GETTERS.isLoggedIn,
    }),
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.article.author.username) {
        return this.currentUser.username === this.article.author.username;
      }
      return false;
    },
    toggleFavorite() {
      if (!this.isLoggedIn) {
        this.$router.push({name: "login"});
        return;
      }
      this.$store.dispatch(FAVORITES_ACTIONS.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavorited,
      });
      const action = this.article.favorited
        ? FAVORITES_ACTIONS
        : FAVORITES_ACTIONS;
      this.$store.dispatch(action, this.article.slug);
    },
  },
};
</script>
