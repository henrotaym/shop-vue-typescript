import Vue from "vue";
import VueI18n from "vue-i18n";
import { defaultLocale } from "./locales";
import messages from "./messages";

Vue.use(VueI18n);

const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
});

export default i18n;
