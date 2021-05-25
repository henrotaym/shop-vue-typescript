import Vue from "vue";
import VueRouter from "vue-router";
import routes, { RouteNames } from "@/router/routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export { RouteNames };
export default router;
