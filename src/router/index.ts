import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "Nova Promoção",
    component: () => import("@/views/Form.vue"),
  },
  {
    path: "/edit/:id",
    name: "Editar Promoção",
    component: () => import("@/views/Form.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} | ${String(to.name)}`;
  next();
});

export default router;
