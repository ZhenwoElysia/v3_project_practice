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
//配置elementui 的中文
import { zhCn } from "element-plus/es/locales.mjs";
app.use(ElementPlus, {
  locale: zhCn,
});

//引入自定义插件，注册全局组件
import register from "@/components/globals/index.ts";
app.use(register);
//引入样式
import "@/style/index.scss";

app.mount("#app");
