interface Product {
  id: number,
  title: string
  price: number,
  category: string,
  description: string,
  image: string
}

interface EditableProduct extends Omit<Product, "id"> { id?: number };

export { Product, EditableProduct };
