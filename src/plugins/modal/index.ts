import { VueConstructor } from "vue/types/umd";
import modal from "./modal";

type Modal = typeof modal;

const plugin = {
  install(Vue: VueConstructor): void {
    Vue.prototype.$modal = Vue.observable(modal);
  },
};

export { Modal };
export default plugin;
