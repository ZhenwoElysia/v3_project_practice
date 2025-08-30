import type { loginType, retrunLoginType, retrunResponseType } from "./type";
//统一管理用户相关的接口
import http from "@/utils/http";
const API = {
  LOGIN_URL: "/user/login",
  INFO_URL: "/user/info",
} as const;
export const reqLogin = (data: loginType) =>
  http.post<any, retrunLoginType>(API.LOGIN_URL, data);
export const reqUerInfo = (data: any) =>
  http.post<any, retrunResponseType>(API.INFO_URL, data);
