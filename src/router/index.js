import Vue from "vue";
import VueRouter from "vue-router";

import ArticlePage from "../views/ArticlePage.vue";
import CreateArticle from "../views/CreateArticle.vue";
import EditArticle from "../views/EditArticle.vue";
import UserProfile from "../views/UserProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/HomeGlobalFeed.vue"),
      },
      {
        path: "my-feed",
        name: "home-my-feed",
        component: () => import("@/views/HomeMyFeed.vue"),
      },
      {
        path: "tag/:slug",
        name: "home-tag-feed",
        component: () => import("@/views/HomeTagFeed.vue"),
      },
    ],
  },
  {
    path: "/articles/new",
    name: "new-article",
    component: CreateArticle,
  },
  {
    path: "/articles/:slug",
    name: "articles",
    component: ArticlePage,
  },
  {
    path: "/articles/:slug/edit",
    name: "editArticle",
    component: EditArticle,
  },
  {
    path: "/@:username",
    component: () => import("@/views/UserProfile.vue"),
    children: [
      {
        path: "",
        name: "profile",
        component: () => import("@/views/ProfileArticles.vue"),
      },
      {
        name: "profile-favorites",
        path: "favorites",
        component: () => import("@/views/ProfileFavorited.vue"),
      },
    ],
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: UserProfile,
  },
  {
    path: "/profiles/:slug/favorites",
    name: "userProfileFavorites",
    component: UserProfile,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterPage.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/SettingsPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
