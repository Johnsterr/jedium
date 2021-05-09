<template>
  <div class="home-page">
    <MainBanner></MainBanner>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isLoggedIn" class="nav-item">
                <router-link
                  :to="{name: 'home-my-feed'}"
                  class="nav-link"
                  :class="{active: routeName === 'home-my-feed'}"
                >
                  Ваши посты
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{name: 'home'}"
                  class="nav-link"
                  :class="{active: routeName === 'home'}"
                  exact
                >
                  Все посты
                </router-link>
              </li>
              <li class="nav-item" v-if="tagName">
                <router-link
                  :to="{name: 'home-tag-feed', params: {tagName}}"
                  class="nav-link"
                  :class="{active: routeName === 'home-tag-feed'}"
                >
                  <i class="ion-pound"></i> {{ tagName }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <SomeLoader v-if="isLoading"></SomeLoader>
          <ErrorMessage v-if="error"></ErrorMessage>
          <div class="sidebar" v-if="tags">
            <p>Популярные тэги</p>
            <div class="tag-list">
              <TagLink
                v-for="(tag, index) in tags"
                :tag="tag"
                :key="index"
              ></TagLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {AUTH_GETTERS} from "@/store/modules/auth.js";
import {TAGS_ACTION} from "../store/modules/tags.js";

import MainBanner from "./global/MainBanner.vue";
import TagLink from "../components/TagLink.vue";

export default {
  name: "Home",
  components: {
    MainBanner,
    TagLink,
  },
  computed: {
    ...mapState({
      isLoading: state => state.tags.isLoading,
      error: state => state.tags.error,
      tags: state => state.tags.data,
    }),
    ...mapGetters({
      isLoggedIn: AUTH_GETTERS.isLoggedIn,
    }),
    routeName() {
      return this.$route.name;
    },
    tagName() {
      return this.$route.params.tag;
    },
  },
  mounted() {
    this.$store.dispatch(TAGS_ACTION.getPopularTags);
  },
};
</script>
