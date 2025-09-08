import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import { viteMockServe } from "vite-plugin-mock";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(command);
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      // viteMockServe({
      //   mockPath: "mock",
      //   // 只在本地开发（vite serve）时启用 mock
      //   localEnabled: command === "serve",
      // }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/style/variations.scss" as *;`,
        },
      },
    },
    //代理跨域
    server: {
      //代理
      proxy: {
        "/api": {
          //服务器地址的设置
          target: env.VITE_SERVE,
          //是否代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      historyApiFallback: true, // 让 SPA 路由刷新不 404
    },
  };
});
