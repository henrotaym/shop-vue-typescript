import { ProductMutations, ProductMutationTypes } from "./product";
import { ProductsMutations, ProductsMutationTypes } from "./products";

const MutationTypes = {
  products: ProductsMutationTypes,
  product: ProductMutationTypes,
};

type Mutations = ProductMutations & ProductsMutations;

export {
  ProductMutations,
  ProductMutationTypes,
  ProductsMutations,
  ProductsMutationTypes,
  MutationTypes,
  Mutations,
};
