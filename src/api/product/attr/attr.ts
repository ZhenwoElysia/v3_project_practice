import http from "@/utils/http";
import type { ResponseDataType } from "./type";
const API = {
  GET_1_CATEGORY: "/admin/product/getCategory1",
};
export const reqCategory1 = () => {
  return http.get<object, ResponseDataType>(API.GET_1_CATEGORY);
};
