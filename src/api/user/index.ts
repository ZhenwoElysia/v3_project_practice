import type { loginType, responseType, returnLoginType } from "./type";
//统一管理用户相关的接口
import http from "@/utils/http";
const API = {
  LOGIN_URL: "/admin/acl/index/login",
  INFO_URL: "/admin/acl/index/info",
  LOGOUT_URL: "/admin/acl/index/logout",
} as const;
//登录的接口
export const reqLogin = (data: loginType) =>
  http.post<object, returnLoginType>(API.LOGIN_URL, data);
//获取用户信息
export const reqUserInfo = (token: string | null) =>
  http.get<object, responseType>(API.INFO_URL, { params: { token } });

//退出登录
export const reqLogout = (token: string) =>
  http.post(API.LOGOUT_URL, { params: { token } });
