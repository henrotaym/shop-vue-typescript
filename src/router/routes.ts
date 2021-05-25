import { RouteConfig } from "vue-router";

enum RouteNames {
  home = "home",
  create = "create",
  products = "products",
  edit = "edit",
}

const routes: Array<RouteConfig> = [
  {
    path: "/products/edit/:productId",
    name: RouteNames.edit,
    component: () => import(/* webpackChunkName: "edit" */ "@/pages/Edit.vue"),
  },
  {
    path: "/products/create",
    name: RouteNames.create,
    component: () =>
      import(/* webpackChunkName: "create" */ "@/pages/Create.vue"),
  },
  {
    path: "/products",
    name: RouteNames.products,
    component: () =>
      import(/* webpackChunkName: "products" */ "@/pages/Products.vue"),
  },
  {
    path: "/",
    name: RouteNames.home,
    redirect: { name: RouteNames.products },
  },
];

export { RouteNames };
export default routes;
