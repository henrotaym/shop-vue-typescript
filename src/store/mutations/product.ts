import { MutationTypes, State } from "@/store/types";
import { MutationTree } from "vuex";
import { ProductMutations } from "../types/mutations";

const mutations: MutationTree<State> & ProductMutations = {
  [MutationTypes.product.SET_PRODUCT](state, payload) {
    state.product.actual = payload;
  },
};

export default mutations;
