import { State, ActionTypes, MutationTypes } from "@/store/types";
import { ActionTree } from "vuex";
import { ProductActions } from "../types/actions";

const actions: ProductActions & ActionTree<State, State> = {
  [ActionTypes.product.SET_PRODUCT]({ commit }, payload) {
    commit(MutationTypes.product.SET_PRODUCT, payload);
  },
};

export default actions;
