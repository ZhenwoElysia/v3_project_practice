//路由鉴权
import router from "@/router/index";

//引入进度条
//不明原因，无法使用
// import nprogress from "nprogress;
//引入进度条的样式
// import "nprogress/nprogress.css";

//全局前置守卫
router.beforeEach((to, from, next) => {
  // nprogress.start();
  console.log("-------", to);
  console.log("-------", from);
  next();
});
//全局后置守卫
router.afterEach((to, from) => {
  // nprogress.done();
  console.log("-------");
  console.log(to);
  console.log(from);
});
