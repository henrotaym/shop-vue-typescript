import { ModelTypes, ArrayTypes } from "@/types";

export type ProductSort = {
  id: string;
  callback: ArrayTypes.Sort<ModelTypes.Product>;
  title: string;
  default?: boolean;
};

export interface State {
  products: {
    all: Array<ModelTypes.Product>;
    search: string;
    sort: {
      all: Array<ProductSort>;
      selected: string;
    };
  };
  product: {
    actual: ModelTypes.Product | null;
  };
}
