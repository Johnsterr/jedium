<template>
  <div>
    <div class="banner">
      <div class="container"></div>
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
import ArticleForm from "../components/ArticleForm.vue";

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
        taglist: [],
      },
      validationErrors: null,
      isSubmitting: false,
    };
  },
  methods: {
    onSubmit(data) {
      console.log(data);
    },
  },
};
</script>
