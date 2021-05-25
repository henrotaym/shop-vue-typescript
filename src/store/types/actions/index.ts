import { ActionContext } from "vuex";
import { ProductsActionTypes, ProductsActions } from "./products";
import { ProductActionTypes, ProductActions } from "./product";
import { State } from "../state";
import { Getters, Mutations } from "..";

const ActionTypes = {
  product: ProductActionTypes,
  products: ProductsActionTypes,
};

interface Actions extends ProductsActions, ProductActions {}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & Omit<ActionContext<State, State>, "commit" | "getters">;

export {
  ActionTypes,
  Actions,
  ProductsActionTypes,
  ProductsActions,
  ProductActionTypes,
  ProductActions,
};
