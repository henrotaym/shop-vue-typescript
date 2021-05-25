import Vue, { VueConstructor } from "vue";
import { Modal } from "./plugins/modal";
import { Store } from "./store/types";

abstract class StrongVueClass extends Vue {
  public $store!: Store;
  public $modal!: Modal;
}

const StrongVue = Vue as VueConstructor<StrongVueClass>;

export default StrongVue;
