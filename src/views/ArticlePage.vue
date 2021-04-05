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
          <span>
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{name: 'editArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit"></i>Редактировать пост</router-link
            >
            <button class="btn btn-outline-danger btn-sm">
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
          Лист тэгов
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes} from "../store/modules/articles.js";
import {mapState} from "vuex";
import SomeLoader from "../components/SomeLoader.vue";
import ErrorMessage from "../components/ErrorMessage.vue";

export default {
  name: "articles",
  components: {
    SomeLoader,
    ErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.articles.isLoading,
      error: (state) => state.articles.error,
      article: (state) => state.articles.data,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
};
</script>
