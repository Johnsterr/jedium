<template>
  <div id="app">
    <the-header></the-header>
    <router-view />
    <the-footer></the-footer>
  </div>
</template>

<script>
import {AUTH_ACTIONS} from "@/store/actions.type.js";

import TheHeader from "./views/global/TheHeader.vue";
import TheFooter from "./views/global/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
  mounted() {
    this.$store.dispatch(AUTH_ACTIONS.getCurrentUser);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #4599df;
}

.navbar-brand {
  color: #4599df !important;
}

.home-page .banner {
  background: #4599df;
}

.nav-pills .nav-link.active,
.nav-pills .nav-link.active:focus,
.nav-pills .nav-link.active:hover,
.nav-pills .nav-item.open .nav-link,
.nav-pills .nav-item.open .nav-link:focus,
.nav-pills .nav-item.open .nav-link:hover {
  background-color: #4599df;
}

a {
  color: #4599df;
}

a:hover,
a:focus {
  color: #2b71aa;
  text-decoration: none;
}

.btn-outline-primary {
  color: #4599df;
  border-color: #4599df;
}

.btn-outline-primary:hover,
.btn-outline-primary:active,
.btn-outline-primary:focus {
  color: #fff;
  background-color: #4599df;
  border-color: #4599df;
}

.btn-outline-primary:active:hover,
.btn-outline-primary:active:focus {
  color: #fff;
  background-color: #3688ca;
  border-color: #236eac;
}

.page-link,
.page-link:focus,
.page-link:hover {
  color: #4599df;
}

.page-item.active .page-link,
.page-item.active .page-link:focus,
.page-item.active .page-link:hover {
  background-color: #4599df;
  border-color: #4599df;
} */
</style>
