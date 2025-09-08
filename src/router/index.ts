import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
//路由
const routes: RouteRecordRaw[] = [
  {
    //           占位，表示该value的key作为params
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "首页",
      isShowInMenu: true, //是否显示到左边菜单中，不写则为undifined
      iconName: "HomeFilled", //菜单文字左侧的图标
    },
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/home.vue"),
        meta: {
          title: "首页",
          isShowInMenu: true,
          iconName: "HomeFilled",
        },
      },
    ],
    //将路由收到的params参数作为prop传入组件
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      title: "登录页",
      iconName: "HomeFilled",
    },
  },
  {
    path: "/screen",
    name: "Screen",
    component: () => import("@/views/screen/index.vue"),
    meta: {
      title: "数据大屏",
      isShowInMenu: true,
      iconName: "Platform",
    },
  },
  {
    path: "/aci",
    name: "Aci",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "权限管理",
      isShowInMenu: true,
      iconName: "lock",
    },
    children: [
      {
        path: "role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "用户管理",
          isShowInMenu: true,
          iconName: "User",
        },
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/acl/user/index.vue"),
        meta: {
          title: "角色管理",
          isShowInMenu: true,
          iconName: "UserFilled",
        },
      },
      {
        path: "permission",
        name: "Permission",
        component: () => import("@/views/acl/permission/index.vue"),
        meta: {
          title: "菜单管理",
          isShowInMenu: true,
          iconName: "Monitor",
        },
      },
    ],
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "商品管理",
      isShowInMenu: true,
      iconName: "Goods",
    },
    children: [
      {
        path: "attr",
        name: "Attr",
        component: () => import("@/views/product/attr/index.vue"),
        meta: {
          title: "属性管理",
          isShowInMenu: true,
          iconName: "ChromeFilled",
        },
      },
      {
        path: "sku",
        name: "Sku",
        component: () => import("@/views/product/sku/index.vue"),
        meta: {
          title: "sku管理",
          isShowInMenu: true,
          iconName: "Orange",
        },
      },
      {
        path: "spu",
        name: "Spu",
        component: () => import("@/views/product/spu/index.vue"),
        meta: {
          title: "spu管理",
          isShowInMenu: true,
          iconName: "Calendar",
        },
      },
      {
        path: "trademark",
        name: "Trademark",
        component: () => import("@/views/product/trademark/index.vue"),
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
    name: "404",
    component: () => import("@/views/404/404.vue"),
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
  history: createWebHashHistory(import.meta.env.VITE_APP_BASE_URL),
});

export default router;
