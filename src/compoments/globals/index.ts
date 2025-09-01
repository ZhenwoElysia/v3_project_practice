//自动注册全局组件
import SvgIcon from "./SvgIcon/SvgIcon.vue";

const allGlobalCompoments = {
  SvgIcon,
};

export default {
  //务必叫install方法，会得到app的实例对象
  //@ts-expect-error  安装插件
  install(app) {
    // app.components("SvgIcon", SvgIcon);
    Object.keys(allGlobalCompoments).forEach((key) => {
      //@ts-expect-error  将插件注入到组件
      app.component(key, allGlobalCompoments[key]);
    });
  },
};
