import { ModelTypes } from "@/types";
import { State } from "../state";

enum MutationTypes {
  SET_PRODUCT = "PRODUCT_SET_PRODUCT",
}

type ProductMutations<S = State> = {
  [MutationTypes.SET_PRODUCT](
    state: S,
    payload: ModelTypes.Product | null
  ): void;
};

export { MutationTypes as ProductMutationTypes, ProductMutations };
