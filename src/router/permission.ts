//路由鉴权
import router from "@/router/index";

import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
  NavigationGuardNext,
} from "vue-router";

//引入pinia仓库，获取token
import pinia from "@/store";
import useUserStore from "@/store/modules/user";
const userStore = useUserStore(pinia);
//引入进度条
//不明原因，无法使用
// import nprogress from "nprogress;
//引入进度条的样式
// import "nprogress/nprogress.css";

//全局前置守卫
router.beforeEach(async (to, from, next) => {
  // nprogress.start();
  await judLoginPermission_before(to, from, next);
});
//全局后置守卫
// router.afterEach((to, from) => {
//   // nprogress.done();
//   console.log("-------");
// });

//七个路由：login||数据大屏||首页||商品管理||用户管理||404||任意路由

//登陆时在login,仅允许访问login
async function judLoginPermission_before(
  to: RouteLocationNormalizedGeneric,
  _from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) {
  const token = userStore.token;
  const username = userStore.username;
  if (token) {
    //已经登录成功的无法访问login
    if (to.path === "/Login") {
      next({ path: "/", query: { redirect: to.path } });
    } else {
      //如果有用户名
      if (username) {
        next();
      } else {
        //没有用户信息，获取用户信息
        try {
          await userStore.getUserInfo();
          next();
        } catch (err) {
          console.log(err);
          await userStore.logout();
          next({ path: "/Login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    //还未登录的判断路径进行访问
    if (to.path === "/Login") {
      next();
    } else {
      next({ path: "/Login" });
    }
  }
}
