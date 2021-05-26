const form = {
  title: {
    label: "Title",
    placeholder: "Product title",
    error: {
      required: "Title field is required.",
      min: "Title should be at least {length} characters.",
    },
  },
  price: {
    label: "Price",
    placeholder: "Product Price",
    error: {
      required: "Price field is required.",
      min: "Price must be at least {amount}€.",
    },
  },
  category: {
    label: "Category",
    error: {
      required: "You must select a category.",
    },
  },
  description: {
    label: "Description",
    placeholder: "Product description",
    error: {
      max: "Description should not exceed {length} characters.",
    },
  },
  image: {
    label: "Image",
  },
  buttons: {
    submit: {
      edit: "Edit this product",
      create: "Create this product",
    },
  },
};

export default form;
