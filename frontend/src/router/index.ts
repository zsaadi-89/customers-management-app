import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/ClientList.vue"),
  },
  {
    path: "/nouveau-client",
    name: "new-client",
    // route level code-splitting
    // this generates a separate chunk (new-client.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "new-client" */ "../views/ClientEdit.vue"),
  },
  {
    path: "/client/:id",
    name: "edit-client",
    component: () =>
      import(/* webpackChunkName: "edit-client" */ "../views/ClientEdit.vue"),
    props: true, // Important to pass the id as a prop to the component
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
