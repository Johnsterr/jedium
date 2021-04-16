<template>
  <button
    class="btn btn-sm btn-secondary action-btn"
    v-if="userProfile.following"
    @click.prevent="unfollow"
  >
    <i class="ion-plus-round"></i>&nbsp;Отписаться
    {{ userProfile.username }}
  </button>
  <button
    @click="handleFollow"
    class="btn btn-sm"
    :class="{
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic,
    }"
  >
    <i class="ion-heart"></i>
    <span class="counter">&nbsp;{{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import {PROFILE_ACTIONS} from "../store/actions.type.js";

export default {
  name: "FollowingButton",
  props: {
    isFollowing: {
      type: Boolean,
      required: true,
    },
    profileUsername: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFollowingOptimistic: this.isFollowing,
    };
  },
  methods: {
    handleLike() {
      this.$store.dispatch(PROFILE_ACTIONS.userProfileFollow, {
        slug: this.articleSlug,
        isFollowing: this.isFollowing,
      });
      this.isFollowingOptimistic = !this.isFollowingOptimistic;
    },
  },
};
</script>
