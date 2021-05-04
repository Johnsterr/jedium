import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import dateFilter from "./filters/date.filter.js";
import SomeLoader from "./components/global/SomeLoader.vue";
import ErrorMessage from "./components/global/ErrorMessage.vue";

Vue.filter("date", dateFilter);
Vue.component("SomeLoader", SomeLoader);
Vue.component("ErrorMessage", ErrorMessage);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
