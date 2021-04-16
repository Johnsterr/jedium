<template>
  <div>
    <SomeLoader v-if="isLoading"></SomeLoader>
    <ErrorMessage v-if="error"></ErrorMessage>
  </div>
</template>

<script>
import SomeLoader from "./SomeLoader.vue";
import ErrorMessage from "./ErrorMessage.vue";

export default {
  name: "ArticleList",
  components: {
    SomeLoader,
    ErrorMessage,
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
      currentPage: 1
    }
  }
};
</script>
