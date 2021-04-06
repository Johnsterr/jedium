<template>
  <div class="container">
    <div class="banner">
      <h1>Редактирование поста</h1>
    </div>
    <some-loader v-if="isLoading"></some-loader>
    <article-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    ></article-form>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ArticleForm from "../components/ArticleForm.vue";
import SomeLoader from "../components/SomeLoader.vue";
import {actionTypes} from "../store/modules/editArticle.js";

export default {
  name: "editArticle",
  components: {
    ArticleForm,
    SomeLoader,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
      validationErrors: (state) => state.editArticle.validationErrors,
    }),
    initialValues() {
      if (!this.article) {
        return null;
      }

      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug;
      this.$store
        .dispatch(actionTypes.editArticle, {slug, articleInput})
        .then((article) => {
          this.$router.push({name: "articles", params: {slug: article.slug}});
        });
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
};
</script>
