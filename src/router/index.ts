import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
//路由
const routes: RouteRecordRaw[] = [
  {
    //           :token占位，表示该value的key作为params
    path: "/:token",
    component: () => import("@/views/Home/Home.vue"),
    name: "home",
    meta: {
      title: "首页",
      isShowInMenu: true,
    },
    //将路由收到的params参数作为prop传入组件
    props: true,
    children: [
      {
        path: "/:token",
        component: () => import("@/views/Home/Home.vue"),
        meta: {
          title: "测试用",
          isShowInMenu: true,
        },
      },
      {
        path: "/:token",
        component: () => import("@/views/Home/Home.vue"),
        meta: {
          title: "测试用",
          isShowInMenu: true,
        },
      },
    ],
  },
  {
    path: "/Login",
    component: () => import("@/pages/Login/Login.vue"),
    name: "login",
    meta: {
      title: "登录页",
      isShowInMenu: false,
    },
  },
  {
    path: "/404",
    component: () => import("@/pages/404/404.vue"),
    name: "404",
    meta: {
      title: "404页面",
      isShowInMenu: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/Login",
    meta: {
      title: "测试用",
      isShowInMenu: false,
    },
  },
];
//创建路由器
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
});

export default router;
