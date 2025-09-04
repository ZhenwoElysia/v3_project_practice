import type { loginType, retrunLoginType, retrunResponseType } from "./type";
//统一管理用户相关的接口
import http from "@/utils/http";
const API = {
  LOGIN_URL: "/user/login",
  INFO_URL: "/user/info",
} as const;
//登录的接口
export const reqLogin = (data: loginType) =>
  http.post<object, retrunLoginType>(API.LOGIN_URL, data);
export const reqUserInfo = () =>
  http.get<object, retrunResponseType>(API.INFO_URL);
