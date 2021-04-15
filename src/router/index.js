import Vue from "vue";
import VueRouter from "vue-router";

import GlobalFeed from "../views/GlobalFeed.vue";
import YourFeed from "../views/YourFeed.vue";
import TagFeed from "../views/TagFeed.vue";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import ArticlePage from "../views/ArticlePage.vue";
import CreateArticle from "../views/CreateArticle.vue";
import EditArticle from "../views/EditArticle.vue";
import SettingsPage from "../views/SettingsPage.vue";
import UserProfile from "../views/UserProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: GlobalFeed,
  },
  {
    path: "/feed",
    name: "yourFeed",
    component: YourFeed,
  },
  {
    path: "/tags/:slug",
    name: "tag",
    component: TagFeed,
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
    path: "/settings",
    name: "settings",
    component: SettingsPage,
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
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
