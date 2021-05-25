import { MutationTypes, Mutations, State } from "@/store/types";
import { MutationTree } from "vuex";
import { ProductsMutations } from "../types/mutations";

const mutations: MutationTree<State> & ProductsMutations = {
  [MutationTypes.products.SET_PRODUCTS](state, payload) {
    state.products.all = payload;
  },
  [MutationTypes.products.SET_PRODUCT_SEARCH](state, payload) {
    state.products.search = payload;
  },
  [MutationTypes.products.SET_SELECTED_SORT](state, payload) {
    state.products.sort.selected = payload.id;
  },
};

export default mutations;
