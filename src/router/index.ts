import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
//路由
import Home from "@/pages/Home/Home.vue";
import Login from "@/pages/Login/Login.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/Home",
    component: Home,
  },
  {
    path: "/Login",
    component: Login,
  },
];
//创建路由器
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
});

export default router;
