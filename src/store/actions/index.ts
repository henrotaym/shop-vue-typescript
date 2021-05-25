import { State, Actions } from "@/store/types";
import { ActionTree } from "vuex";
import productsActions from "./products";
import productActions from "./product";

const actions: Actions & ActionTree<State, State> = {
  ...productsActions,
  ...productActions,
};

export default actions;
