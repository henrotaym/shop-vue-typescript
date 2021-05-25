import { ModelTypes } from "@/types";
import { AugmentedActionContext } from ".";

enum ActionTypes {
  SET_PRODUCTS = "PRODUCTS_SET_PRODUCTS",
  DELETE_PRODUCT = "PRODUCTS_DELETE_PRODUCT",
  STORE_PRODUCT = "PRODUCTS_STORE_PRODUCT",
  UPDATE_PRODUCT = "PRODUCTS_UPDATE_PRODUCT",
  SET_PRODUCT_SEARCH = "PRODUCTS_SET_PRODUCT_SEARCH",
  SET_SELECTED_SORT = "PRODUCTS_SET_SELECTED_SORT",
}

interface ProductsActions {
  [ActionTypes.SET_PRODUCTS](
    { commit }: AugmentedActionContext,
    payload: Array<ModelTypes.Product>
  ): void;
  [ActionTypes.DELETE_PRODUCT](
    { commit }: AugmentedActionContext,
    payload: { id: number }
  ): void;
  [ActionTypes.STORE_PRODUCT](
    { commit }: AugmentedActionContext,
    payload: ModelTypes.Product
  ): void;
  [ActionTypes.UPDATE_PRODUCT](
    { commit }: AugmentedActionContext,
    payload: ModelTypes.Product
  ): void;
  [ActionTypes.SET_PRODUCT_SEARCH](
    { commit }: AugmentedActionContext,
    payload: string
  ): void;
  [ActionTypes.SET_SELECTED_SORT](
    { commit, state }: AugmentedActionContext,
    payload: { id: string }
  ): void;
}

export { ActionTypes as ProductsActionTypes, ProductsActions };
