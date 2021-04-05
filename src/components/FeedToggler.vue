<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outlie-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          :to="{name: 'yourFeed'}"
          class="nav-link"
          :class="{active: routeName === 'yourFeed'}"
          >Ваши посты</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          :to="{name: 'home'}"
          class="nav-link"
          :class="{active: routeName === 'home'}"
          >Все посты</router-link
        >
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link
          :to="{name: 'tag'}"
          class="nav-link"
          :class="{active: routeName === 'tag'}"
        >
          <i class="ion-pound"></i>
          {{ tagName }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {gettersTypes} from "../store/modules/auth.js";

export default {
  name: "FeedToggler",
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: gettersTypes.isLoggedIn,
    }),
    routeName() {
      return this.$route.name;
    },
  },
};
</script>
