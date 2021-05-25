import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import modal from "./plugins/modal";

import "@/sass/index.scss";

Vue.config.productionTip = false;
Vue.use(modal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
