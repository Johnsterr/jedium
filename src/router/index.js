import Vue from "vue";
import VueRouter from "vue-router";
import GlobalFeed from "../views/GlobalFeed.vue";
import YourFeed from "../views/YourFeed.vue";
import TagFeed from "../views/TagFeed.vue";
import SignUpPage from "../views/SignUpPage.vue";
import SignInPage from "../views/SignInPage.vue";
import ArticlePage from "../views/ArticlePage.vue";
import CreateArticle from "../views/CreateArticle.vue";

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
    name: "createArticle",
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
