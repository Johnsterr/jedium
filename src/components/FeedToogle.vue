<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-if="isLoggedIn" class="nav-item">
        <router-link
          :to="{name: 'yourFeed'}"
          class="nav-link"
          :class="{active: routeName === 'yourFeed'}"
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
          :to="{name: 'home-tag', params: {tagName}}"
          class="nav-link"
          :class="{active: routeName === 'tag'}"
        >
          <i class="ion-pound"></i> {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";


export default {
  name: "FeedToggle",
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: AUTH_GETTERS.isLoggedIn,
    }),
  },
  
};
</script>
