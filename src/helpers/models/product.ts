import { ModelTypes } from "@/types";
const helpers = {
  async index(): Promise<Array<ModelTypes.Product>> {
    let products = [];
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      products = await response.json();
    } catch (err) {
      console.error(err);
    }
    return products;
  },
  async show({ id }: { id: number }): Promise<ModelTypes.Product | null> {
    let product = null;
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      product = await response.json();
    } catch (err) {
      console.error(err);
    }
    return product;
  },
  async update(product: ModelTypes.Product): Promise<{ id: number }> {
    let stored;
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${product.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ ...product, image: "" }),
        }
      );
      stored = await response.json();
    } catch (err) {
      console.error(err);
    }
    return stored;
  },
  async store(product: ModelTypes.EditableProduct): Promise<{ id: number }> {
    let stored;
    try {
      const response = await fetch(`https://fakestoreapi.com/products`, {
        method: "POST",
        body: JSON.stringify({ ...product, image: "" }),
      });
      stored = await response.json();
    } catch (err) {
      console.error(err);
    }
    return stored;
  },
  async delete({ id }: { id: number }): Promise<ModelTypes.Product | null> {
    let product = null;
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      product = await response.json();
    } catch (err) {
      console.error(err);
    }
    return product;
  },
  new(): ModelTypes.EditableProduct {
    return {
      title: "",
      price: 0,
      category: "",
      description: "",
      image: "",
    };
  },
};

export default helpers;
