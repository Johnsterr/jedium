<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}"
        >Jedium</router-link
      >
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'home'}"
            active-class="active"
            exact
            >Home</router-link
          >
        </li>
        <!-- Template for Logged User -->
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'createArticle'}"
              active-class="active"
              exact
              ><i class="ion-compose"></i> &nbsp; New Article</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'settings'}"
              active-class="active"
              exact
              ><i class="ion-gear-a"></i> &nbsp; Settings</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'userProfile', params: {slug: currentUser.username}}"
              active-class="active"
              exact
              ><img class="user-pic" :src="currentUser.image" alt="user_logo" />
              &nbsp; {{ currentUser.username }}</router-link
            >
          </li>
        </template>
        <!-- Template for Not logged User -->
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'signin'}"
              active-class="active"
              exact
              >Sign In</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'signup'}"
              active-class="active"
              exact
              >Sign Up</router-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from "vuex";
import {gettersTypes} from "../store/modules/auth.js";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters({
      currentUser: gettersTypes.currentUser,
      isLoggedIn: gettersTypes.isLoggedIn,
      isAnonymous: gettersTypes.isAnonymous,
    }),
  },
};
</script>
