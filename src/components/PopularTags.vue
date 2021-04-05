<template>
  <div>
    <some-loader v-if="isLoading"></some-loader>
    <error-message v-if="error"></error-message>
    <div v-if="error">Something bad happened.</div>
    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          v-for="tag in popularTags"
          :key="tag"
          :to="{name: 'tag', params: {slug: tag}}"
          class="tag-default tag-pill"
          >{{ tag }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {actionTypes} from "../store/modules/popularTags.js";
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
      isLoading: state => state.feed.isLoading,
      error: state => state.feed.error,
      popularTags: state => state.popularTags.data,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags);
  },
};
</script>
