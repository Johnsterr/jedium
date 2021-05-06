<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" alt="" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div v-if="isCurrentUserProfile">
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{name: 'settings'}"
              >
                <i class="ion-gear-a"></i>&nbsp;Редактировать профиль
              </router-link>
            </div>
            <div v-if="isLoggedIn && !isCurrentUserProfile">
              <button
                class="btn btn-sm btn-secondary action-btn"
                v-if="userProfile.following"
                @click.prevent="unfollow"
              >
                <i class="ion-plus-round"></i>&nbsp;Отписаться
                {{ userProfile.username }}
              </button>
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
                v-if="!userProfile.following"
                @click.prevent="follow"
              >
                <i class="ion-plus-round"></i>&nbsp;Подписаться
                {{ userProfile.username }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active: routeName === 'userProfile'}"
                  :to="{
                    name: 'userProfile',
                    params: {slug: userProfile.username},
                  }"
                >
                  <span v-if="isCurrentUserProfile">Мои посты</span>
                  <span v-else>Посты {{ userProfile.username }}</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active: routeName === 'userProfileFavorites'}"
                  :to="{
                    name: 'userProfileFavorites',
                    params: {slug: userProfile.username},
                  }"
                >
                  Отслеживаемые посты
                </router-link>
              </li>
            </ul>
          </div>
          <feed-view :api-url="apiUrl"></feed-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import {AUTH_GETTERS} from "@/store/modules/auth.js";
import {PROFILE_ACTIONS} from "@/store/modules/profile.js";

import FeedView from "../components/FeedView.vue";

export default {
  name: "userProfile",
  components: {
    FeedView,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.profile.isLoading,
      isSubmitting: (state) => state.profile.isSubmitting,
      error: (state) => state.profile.error,
      userProfile: (state) => state.profile.data,
    }),
    ...mapGetters({
      currentUser: AUTH_GETTERS.currentUser,
      isLoggedIn: AUTH_GETTERS.isLoggedIn,
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false;
      }
      return this.currentUser.username === this.userProfile.username;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes("favorites");
      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`;
    },
    userProfileSlug() {
      return this.$route.params.slug;
    },
    routeName() {
      return this.$route.name;
    },
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile();
    },
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(PROFILE_ACTIONS.getUserProfile, {
        slug: this.userProfileSlug,
        isFollowing: this.isFollowing,
      });
    },
    follow() {
      this.$store.dispatch(PROFILE_ACTIONS.userProfileFollow, {
        slug: this.userProfileSlug,
        isFollowing: this.isFollowing,
      });
    },
    unfollow() {
      this.$store.dispatch(PROFILE_ACTIONS.userProfileUnfollow, {
        slug: this.userProfileSlug,
        isFollowing: !this.isFollowing,
      });
    },
  },
  mounted() {
    this.getUserProfile();
  },
};
</script>
