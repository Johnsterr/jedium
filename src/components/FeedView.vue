<template>
  <div>Feed</div>
</template>

<script>
import {actionTypes} from "../store/modules/feed.js";

export default {
  name: "FeedView",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl});
  },
};
</script>
