<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
            ><img :src="article.author.image" alt=""
          /></router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
              >{{ article.author.username }}</router-link
            >
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{name: 'editArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit"></i>Редактировать пост</router-link
            >
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i>
              Удалить пост
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <some-loader v-if="isLoading"></some-loader>
      <error-message v-if="error" :message="error"></error-message>
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <tag-list :tags="article.tagList"></tag-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import {AUTH_GETTERS} from "../store/getters.type.js";
import {actionTypes as articleActionTypes} from "../store/modules/articles.js";

import SomeLoader from "../components/SomeLoader.vue";
import ErrorMessage from "../components/ErrorMessage.vue";
import TagList from "../components/TagList.vue";

export default {
  name: "articles",
  components: {
    SomeLoader,
    ErrorMessage,
    TagList,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.articles.isLoading,
      error: (state) => state.articles.error,
      article: (state) => state.articles.data,
    }),
    ...mapGetters({
      currentUser: AUTH_GETTERS.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }
      return this.currentUser.username === this.article.author.username;
    },
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.$route.params.slug,
        })
        .then(() => {
          this.$router.push({name: "home"});
        });
    },
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
};
</script>
