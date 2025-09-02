import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
//路由
const routes: RouteRecordRaw[] = [
  {
    //           占位，表示该value的key作为params
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "Layout",
    meta: {
      title: "首页",
      isShowInMenu: true,
      iconName: "HomeFilled", //菜单文字左侧的图标
    },
    redirect: "/Home",
    children: [],
    //将路由收到的params参数作为prop传入组件
  },
  {
    path: "/Login",
    component: () => import("@/views/Login/index.vue"),
    name: "Login",
    meta: {
      title: "登录页",
      isShowInMenu: true,
      iconName: "HomeFilled",
    },
  },
  {
    path: "/Screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      title: "数据大屏",
      isShowInMenu: true,
      iconName: "Platform",
    },
  },
  {
    path: "/Aci",
    name: "Aci",
    meta: {
      title: "权限管理",
      isShowInMenu: true,
      iconName: "lock",
    },
    children: [
      {
        path: "/Role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "用户管理",
          isShowInMenu: true,
          iconName: "User",
        },
      },
      {
        path: "/User",
        component: () => import("@/views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "角色管理",
          isShowInMenu: true,
          iconName: "UserFilled",
        },
      },
      {
        path: "/Permission",
        component: () => import("@/views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          isShowInMenu: true,
          iconName: "Monitor",
        },
      },
    ],
  },
  {
    path: "/Product",
    name: "Product",
    meta: {
      title: "商品管理",
      isShowInMenu: true,
      iconName: "Goods",
    },
    children: [
      {
        path: "/Attr",
        component: () => import("@/views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          isShowInMenu: true,
          iconName: "ChromeFilled",
        },
      },
      {
        path: "/Sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "sku管理",
          isShowInMenu: true,
          iconName: "Orange",
        },
      },
      {
        path: "/Spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "spu管理",
          isShowInMenu: true,
          iconName: "Calendar",
        },
      },
      {
        path: "/Trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          isShowInMenu: true,
          iconName: "ShoppingCart",
        },
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/404/404.vue"),
    name: "404",
    meta: {
      title: "404页面",
      isShowInMenu: false,
      iconName: "HomeFilled",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
    meta: {
      title: "测试用",
      isShowInMenu: false,
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
