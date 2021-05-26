import { State } from "./types";
import i18n from "@/i18n";

const state: State = {
  products: {
    all: [],
    search: "",
    sort: {
      all: [
        {
          id: "id-asc",
          title: i18n.t("products.sort.id.asc") as string,
          callback: (a, b) => (a.id < b.id ? -1 : 1),
          default: true,
        },
        {
          id: "id-desc",
          title: i18n.t("products.sort.id.desc") as string,
          callback: (a, b) => (a.id > b.id ? -1 : 1),
        },
        {
          id: "price-asc",
          title: i18n.t("products.sort.price.asc") as string,
          callback: (a, b) =>
            a.price < b.price ? -1 : a.price === b.price ? 0 : 1,
        },
        {
          id: "price-desc",
          title: i18n.t("products.sort.price.desc") as string,
          callback: (a, b) =>
            a.price > b.price ? -1 : a.price === b.price ? 0 : 1,
        },
        {
          id: "title-asc",
          title: i18n.t("products.sort.title.asc") as string,
          callback: (a, b) =>
            a.title < b.title ? -1 : a.title === b.title ? 0 : 1,
        },
        {
          id: "title-desc",
          title: i18n.t("products.sort.title.desc") as string,
          callback: (a, b) =>
            a.title > b.title ? -1 : a.title === b.title ? 0 : 1,
        },
      ],
      selected: "id-asc",
    },
  },
  product: {
    actual: null,
  },
};

export default state;
