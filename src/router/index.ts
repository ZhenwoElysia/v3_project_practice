import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
//路由
const routes: RouteRecordRaw[] = [
  {
    //           :token占位，表示该value的key作为params
    path: "/Home/:token",
    component: () => import("@/pages/Home/Home.vue"),
    name: "home",
    //将路由收到的params参数作为prop传入组件
    props: true,
    children: [],
  },
  {
    path: "/Login",
    component: () => import("@/pages/Login/Login.vue"),
    name: "login",
  },
  {
    path: "/404",
    component: () => import("@/pages/404/404.vue"),
    name: "404",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/Login",
  },
];
//创建路由器
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
});

export default router;
