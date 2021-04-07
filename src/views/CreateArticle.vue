<template>
  <div class="container">
    <div class="banner">
      <h1>Создание поста</h1>
    </div>
    <article-form
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
import {actionTypes} from "../store/modules/createArticle.js";

export default {
  name: "createArticle",
  components: {
    ArticleForm,
  },
  data() {
    return {
      initialValues: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validationErrors: (state) => state.createArticle.validationErrors,
    }),
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.createArticle, {articleInput})
        .then((article) => {
          this.$router.push({name: "articles", params: {slug: article.slug}});
        });
    },
  },
};
</script>
