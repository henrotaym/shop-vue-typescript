import helpers from "@/helpers";
import { State, ActionTypes, MutationTypes, GetterTypes } from "@/store/types";
import { ActionTree } from "vuex";
import { ProductsActions } from "../types/actions";

const actions: ProductsActions & ActionTree<State, State> = {
  [ActionTypes.products.SET_PRODUCTS]({ commit, getters }, payload) {
    payload.sort(getters[GetterTypes.SELECTED_SORT].callback);
    commit(MutationTypes.products.SET_PRODUCTS, payload);
  },
  [ActionTypes.products.STORE_PRODUCT]({ dispatch, state }, payload) {
    dispatch(ActionTypes.products.SET_PRODUCTS, [
      ...state.products.all,
      payload,
    ]);
  },
  [ActionTypes.products.UPDATE_PRODUCT]({ dispatch, state }, payload) {
    const index = state.products.all.findIndex(({ id }) => id === payload.id);
    if (index === -1) return;
    const products = [...state.products.all];
    products.splice(index, 1, payload);
    dispatch(ActionTypes.products.SET_PRODUCTS, products);
  },
  [ActionTypes.products.DELETE_PRODUCT]({ dispatch, state }, payload) {
    const index = state.products.all.findIndex(({ id }) => id === payload.id);
    if (index === -1) return;
    const products = [...state.products.all];
    products.splice(index, 1);
    dispatch(ActionTypes.products.SET_PRODUCTS, products);
  },
  [ActionTypes.products.SET_PRODUCT_SEARCH]({ commit }, payload) {
    commit(
      MutationTypes.products.SET_PRODUCT_SEARCH,
      helpers.strings.normalize(payload)
    );
  },
  [ActionTypes.products.SET_SELECTED_SORT](
    { commit, state, getters },
    payload
  ) {
    if (
      state.products.sort.all.findIndex(({ id }) => id === payload.id) !== -1
    ) {
      commit(MutationTypes.products.SET_SELECTED_SORT, payload);
      state.products.all.sort(getters[GetterTypes.SELECTED_SORT].callback);
    }
  },
};

export default actions;
