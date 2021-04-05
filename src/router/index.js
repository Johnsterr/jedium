import Vue from "vue";
import VueRouter from "vue-router";
import GlobalFeed from "../views/GlobalFeed.vue";
import YourFeed from "../views/YourFeed.vue";
import TagFeed from "../views/TagFeed.vue";
import SignUpPage from "../views/SignUpPage.vue";
import SignInPage from "../views/SignInPage.vue";
import ArticlePage from "../views/ArticlePage.vue";

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
    path: "/article/new",
    name: "createArticle",
    component: GlobalFeed,
  },
  {
    path: "/article/:slug",
    name: "article",
    component: ArticlePage,
  },
  {
    path: "/article/:slug/edit",
    name: "editArticle",
    component: GlobalFeed,
  },
  {
    path: "/settings",
    name: "settings",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug/favorites",
    name: "userProfileFavorites",
    component: GlobalFeed,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpPage,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignInPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
