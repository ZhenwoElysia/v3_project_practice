import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { loginType } from "@/api/user/type";
import router from "@/router";

const useUserStore = defineStore("user", {
  //储存数据
  state() {
    return {
      //获取token
      token: localStorage.getItem("TOKEN"), //用户的唯一标识
      menuRoutes: router,
      avatar: "", //用户头像
      username: "", //用户名
    };
  },
  //处理异步或者逻辑
  actions: {
    //登录的方法
    async userLogin(user: loginType) {
      const result = await reqLogin(user);
      //登录成功
      if (result.code === 200) {
        //存储token
        //------------后端result.data就是真正的token-------------
        this.token = result.data;
        localStorage.setItem("TOKEN", this.token as string);
        return result;
      } else {
        return Promise.reject(result);
      }
    },
    //获取用户信息的方法
    async getUserInfo() {
      const result = await reqUserInfo(this.token);
      if (result.code === 200) {
        const data = result.data;
        this.avatar = data.avatar;
        this.username = data.name;
        return true;
      } else {
        return Promise.reject("获取用户信息失败");
      }
    },
    async logout() {
      //要告诉服务器登陆推出的请求(无相应的mock接口)
      await reqLogout(this.token as string);
      //清空token等相关信息
      //跳转到Login
      this.token = "";
      this.avatar = "";
      this.username = "";
      localStorage.removeItem("TOKEN");
    },
  },
});
export default useUserStore;
