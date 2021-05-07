<template>
  <!-- Пользователь является автором -->
  <span v-if="isAuthor">
    <router-link class="btn btn-outline-secondary btn-sm" :to="editArticleLink">
      <i class="ion-edit"></i>
      <span>&nbsp;Редактировать</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
      <i class="ion-trash-a"></i>
      <span>&nbsp;Удалить</span>
    </button>
  </span>
  <!-- Пользователь не является автором -->
  <span v-else>
    <div></div>
    <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
      <i class="ion-plus-round"></i>
      <span>&nbsp;{{ followUserLabel }}</span>
    </button>
    <span>&nbsp;&nbsp;</span>
    <button
      class="btn btn-sm"
      @click="toggleFavorite"
      :class="toggleFavoriteButtonClasses"
    >
      <i class="ion-heart"></i>
      <span>&nbsp;{{ favoriteArticleLabel }}</span>
      <span class="counter">&nbsp;{{ favoriteCounter }}</span>
    </button>
  </span>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import {AUTH_GETTERS} from "@/store/modules/auth.js";
import {actionTypes as articleActionTypes} from "../store/modules/articles.js";
import {PROFILE_ACTIONS} from "../store/modules/profile.js";
// ARTICLE_ACTIONS,
// PROFILE_ACTIONS,
// FAVORITE_ADD,
// FAVORITE_REMOVE,
// FETCH_PROFILE_FOLLOW,
// FETCH_PROFILE_UNFOLLOW,
// } from "../store/actions.type.js";

export default {
  name: "ArticleActions",
  props: {
    article: {
      type: Object,
      required: true,
    },
    isAuthor: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState({
      userProfile: state => state.userProfile.data,
    }),
    ...mapGetters({
      currentUser: AUTH_GETTERS.currentUser,
      isLoggedIn: AUTH_GETTERS.isLoggedIn,
    }),
    editArticleLink() {
      return {name: "editArticle", params: {slug: this.article.slug}};
    },
    toggleFavoriteButtonClasses() {
      return {
        "btn-primary": this.article.favorited,
        "btn-outline-primary": !this.article.favorited,
      };
    },
    followUserLabel() {
      return `${this.currentUser.following ? "Отписаться" : "Подписаться"} ${
        this.article.author.username
      }`;
    },
    favoriteArticleLabel() {
      return this.article.favorited
        ? "Не отслеживать пост"
        : "Отслеживать пост";
    },
    favoriteCounter() {
      return `(${this.article.favoritesCount})`;
    },
  },
  methods: {
    // toggleFavorite() {
    //   if (!this.isLoggedIn) {
    //     this.$router.push({name: "login"});
    //     return;
    //   }
    //   const action = this.article.favorited ? FAVORITE_REMOVE : FAVORITE_ADD;
    //   this.$store.dispatch(action, this.article.slug);
    // },
    follow() {
      if (!this.isLoggedIn) {
        this.$router.push({name: "login"});
        return;
      }
      this.$store.dispatch(PROFILE_ACTIONS.userProfileFollow, {
        slug: this.userProfileSlug,
        isFollowing: this.isFollowing,
      });
    },
    unfollow() {
      if (!this.isLoggedIn) {
        this.$router.push({name: "login"});
        return;
      }
      this.$store.dispatch(PROFILE_ACTIONS.userProfileFollow, {
        slug: this.userProfileSlug,
        isFollowing: !this.isFollowing,
      });
    },
    async deleteArticle() {
      try {
        this.$store
          .dispatch(articleActionTypes.deleteArticle, {
            slug: this.$route.params.slug,
          })
          .then(() => {
            this.$router.push("/");
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
