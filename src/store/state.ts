import { State } from "./types";

const state: State = {
  products: {
    all: [],
    search: "",
    sort: {
      all: [
        {
          id: "id-asc",
          title: "ID croissant",
          callback: (a, b) => (a.id < b.id ? -1 : 1),
          default: true,
        },
        {
          id: "id-desc",
          title: "ID décroissant",
          callback: (a, b) => (a.id > b.id ? -1 : 1),
        },
        {
          id: "price-asc",
          title: "Prix croissant",
          callback: (a, b) =>
            a.price < b.price ? -1 : a.price === b.price ? 0 : 1,
        },
        {
          id: "price-desc",
          title: "Prix décroissant",
          callback: (a, b) =>
            a.price > b.price ? -1 : a.price === b.price ? 0 : 1,
        },
        {
          id: "title-asc",
          title: "titre croissant",
          callback: (a, b) =>
            a.title < b.title ? -1 : a.title === b.title ? 0 : 1,
        },
        {
          id: "title-desc",
          title: "titre décroissant",
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
