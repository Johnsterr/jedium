<template>
  <div class="home-page">
    <main-banner></main-banner>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggler></feed-toggler>
          <feed-view :api-url="apiUrl"></feed-view>
        </div>
        <div class="col-md-3">
          <popular-tags></popular-tags>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainBanner from "./global/MainBanner.vue";
import FeedToggler from "../components/FeedToggler.vue";
import FeedView from "../components/FeedView.vue";
import PopularTags from "../components/PopularTags.vue";

export default {
  name: "yourFeed",
  components: {
    MainBanner,
    FeedToggler,
    FeedView,
    PopularTags,
  },
  data() {
    return {
      apiUrl: "/articles/feed",
    };
  },
};
</script>
