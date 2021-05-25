import { ModelTypes } from "@/types";
import { AugmentedActionContext } from ".";

enum ActionTypes {
  SET_PRODUCT = "PRODUCT_SET_PRODUCT",
}

interface ProductActions {
  [ActionTypes.SET_PRODUCT](
    { commit }: AugmentedActionContext,
    payload: ModelTypes.Product | null
  ): void;
}

export { ActionTypes as ProductActionTypes, ProductActions };
