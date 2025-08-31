import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import type { loginType, retrunLoginType } from "@/api/user/type";
const useUserStore = defineStore("user", {
  //储存数据
  state() {
    return {
      //获取token
      token: localStorage.getItem("TOKEN"), //用户的唯一标识
    };
  },
  //处理异步或者逻辑
  actions: {
    async userLogin(user: loginType) {
      const result: retrunLoginType = await reqLogin(user);
      //登录成功
      if (result.code === 200) {
        //存储token
        this.token = result.data.token;
        localStorage.setItem("TOKEN", this.token as string);
        return result;
      } else {
        return Promise.reject(result);
      }
    },
  },
});
export default useUserStore;
