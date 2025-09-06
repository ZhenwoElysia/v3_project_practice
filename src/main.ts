//main.ts
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

//svg插件的配置代码
//@ts-expect-error  ts类型无法识别该文件
import "virtual:svg-icons-register";

//引入ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//引入Element的所有图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//配置elementui 的中文
import { zhCn } from "element-plus/es/locales.mjs";
app.use(ElementPlus, {
  locale: zhCn,
});

//引入自定义插件，注册全局组件
import register from "@/compoments/globals";
app.use(register);
//引入样式
import "@/style/index.scss";

//引入路由
import router from "./router";
app.use(router);
//引入路由鉴权
import "@/router/permission";
//引入pinia
import pinia from "@/store/index";
app.use(pinia);

app.mount("#app");
