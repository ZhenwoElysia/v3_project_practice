import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
//路由
import Home from "@/pages/Home/Home.vue";
import Login from "@/pages/Login/Login.vue";
import badFound from "@/pages/404/404.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    name: "home",
    children: [],
  },
  {
    path: "/Login",
    component: Login,
    name: "login",
  },
  {
    path: "/404",
    component: badFound,
    name: "404",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];
//创建路由器
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
});

export default router;
