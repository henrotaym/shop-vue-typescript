import { ModelTypes } from "@/types";
import { State, ProductSort } from "./state";

export enum GetterTypes {
  FILTERED_PRODUCTS = "FILTERED_PRODUCTS",
  SELECTED_SORT = "SELECTED_SORT",
  DEFAULT_SORT = "DEFAULT_SORT",
  HAS_PRODUCTS = "HAS_PRODUCTS",
 }

export type Getters<S = State> = {
  [GetterTypes.FILTERED_PRODUCTS](state: S): Array<ModelTypes.Product>;
  [GetterTypes.SELECTED_SORT](state: S): ProductSort;
  [GetterTypes.DEFAULT_SORT](state: S): ProductSort;
  [GetterTypes.HAS_PRODUCTS](state: S): boolean;
};
