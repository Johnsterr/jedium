<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-view :api-url="apiUrl"></feed-view>
        </div>
        <div class="col-md-3">POPULAR</div>
      </div>
    </div>
  </div>
</template>

<script>
import FeedView from "../components/FeedView.vue";

export default {
  name: "GlobalFeed",
  components: {
    FeedView,
  },
  data() {
    return {
      apiUrl: "/articles",
    };
  },
};
</script>
