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
      iconName: "HomeFilled", //菜单文字左侧的图标
    },
    //将路由收到的params参数作为prop传入组件
    props: true,
    children: [
      {
        path: "/:token/0",
        component: () => import("@/views/Home/Home.vue"), //测试用，防报错
        meta: {
          title: "测试用",
          isShowInMenu: true,
          iconName: "HomeFilled",
        },
        children: [
          {
            path: "/:token/2",
            component: () => import("@/views/Home/Home.vue"),
            meta: {
              title: "测试用",
              isShowInMenu: true,
              iconName: "HomeFilled",
            },
          },
        ],
      },
      {
        path: "/:token/1",
        component: () => import("@/views/Home/Home.vue"),
        meta: {
          title: "测试用",
          isShowInMenu: true,
          iconName: "HomeFilled",
        },
        children: [
          {
            path: "/:token/2",
            component: () => import("@/views/Home/Home.vue"),
            meta: {
              title: "测试用",
              isShowInMenu: true,
              iconName: "HomeFilled",
            },
          },
          {
            path: "/:token/3",
            component: () => import("@/views/Home/Home.vue"),
            meta: {
              title: "测试用",
              isShowInMenu: true,
              iconName: "HomeFilled",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/Login",
    component: () => import("@/pages/Login/Login.vue"),
    name: "login",
    meta: {
      title: "登录页",
      isShowInMenu: true,
      iconName: "HomeFilled",
    },
  },
  {
    path: "/404",
    component: () => import("@/pages/404/404.vue"),
    name: "404",
    meta: {
      title: "404页面",
      isShowInMenu: true,
      iconName: "HomeFilled",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/Login",
    meta: {
      title: "测试用",
      isShowInMenu: true,
      iconName: "HomeFilled",
    },
  },
];
//创建路由器
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
});

export default router;
