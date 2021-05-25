import { ModelTypes } from "@/types";
import { State } from "../state";

enum MutationTypes {
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_PRODUCT_SEARCH = "SET_PRODUCT_SEARCH",
  SET_SELECTED_SORT = "SET_SELECTED_SORT",
}

interface ProductsMutations<S = State> {
  [MutationTypes.SET_PRODUCTS](
    state: S,
    payload: Array<ModelTypes.Product>
  ): void;
  [MutationTypes.SET_PRODUCT_SEARCH](state: S, payload: string): void;
  [MutationTypes.SET_SELECTED_SORT](state: S, payload: { id: string }): void;
}

export { MutationTypes as ProductsMutationTypes, ProductsMutations };
