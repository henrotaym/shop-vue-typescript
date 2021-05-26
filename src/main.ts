import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import modal from "./plugins/modal";
import Vuelidate from "vuelidate";
import i18n from "@/i18n";

import "@/sass/index.scss";

Vue.config.productionTip = false;
Vue.use(modal);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
