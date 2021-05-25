import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import { State } from "./state";
import { MutationTypes, Mutations } from "./mutations";
import { ActionTypes, Actions } from "./actions";
import { GetterTypes, Getters } from "./getters";

type Store = Omit<VuexStore<State>, "commit" | "dispatch" | "getters"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export {
  Store,
  State,
  MutationTypes,
  Mutations,
  ActionTypes,
  Actions,
  GetterTypes,
  Getters,
};
