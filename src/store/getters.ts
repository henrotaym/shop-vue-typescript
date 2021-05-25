import helpers from "@/helpers";
import { GetterTypes, Getters, State } from "@/store/types";
import { GetterTree } from "vuex";
import { ProductSort } from "./types/state";

const getters: GetterTree<State, State> & Getters = {
  [GetterTypes.FILTERED_PRODUCTS](state) {
    const { products } = state;
    return products.search
      ? products.all.filter((p) =>
          helpers.strings.normalize(p.title).includes(products.search)
        )
      : products.all;
  },
  [GetterTypes.SELECTED_SORT](state) {
    const { all, selected } = state.products.sort;
    const sort = all.find((sort) => sort.id === selected) as ProductSort;
    return sort;
  },
  [GetterTypes.DEFAULT_SORT](state) {
    const sort = state.products.sort.all.find(
      (sort) => sort.default
    ) as ProductSort;
    return sort;
  },
  [GetterTypes.HAS_PRODUCTS](state) {
    return state.products.all.length > 0;
  },
};

export default getters;
