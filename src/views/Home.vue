<template>
  <div class="home-page">
    <main-banner></main-banner>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggle></feed-toggle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainBanner from "../components/MainBanner.vue";
import FeedToggle from "../components/FeedToggle.vue";

export default {
  name: "Home",
  components: {
    MainBanner,
    FeedToggle,
  },
};
</script>
