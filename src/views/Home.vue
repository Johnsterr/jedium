<template>
  <div class="home-page">
    <MainBanner></MainBanner>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <!-- <FeedToggle></FeedToggle> -->
          <router-view></router-view>
        </div>
        <PopularTags></PopularTags>
      </div>
    </div>
  </div>
</template>

<script>
import MainBanner from "./global/MainBanner.vue";
// import FeedToggle from "../components/FeedToggle.vue";
import PopularTags from "../components/PopularTags.vue";

export default {
  name: "Home",
  components: {
    MainBanner,
    // FeedToggle,
    PopularTags,
  },
};
</script>
