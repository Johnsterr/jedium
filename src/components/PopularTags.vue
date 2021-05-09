<template>
  <div class="col-md-3">
    <SomeLoader v-if="isLoading"></SomeLoader>
    <ErrorMessage v-if="error"></ErrorMessage>
    <div class="sidebar" v-if="tags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          class="tag-default tag-pill"
          v-for="(tag, index) in tags"
          :key="index"
          :to="{name: 'home-tag-feed', params: {slug: tag}}"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {TAGS_ACTION} from "../store/modules/tags.js";

import SomeLoader from "../components/SomeLoader.vue";
import ErrorMessage from "../components/ErrorMessage.vue";

export default {
  name: "PopularTags",
  components: {
    SomeLoader,
    ErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: state => state.tags.isLoading,
      error: state => state.tags.error,
      tags: state => state.tags.data,
    }),
  },
  mounted() {
    this.$store.dispatch(TAGS_ACTION.getPopularTags);
  },
};
</script>
