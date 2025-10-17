import http from "@/utils/http";
import type { ResponseDataType } from "./type";
const API = {
  GET_1_CATEGORY: "/admin/product/getCategory1",
  ///admin/product/getCategory2/{id}
  GET_2_CATEGORY: "/admin/product/getCategory2",
  GET_3_CATEGORY: "/admin/product/getCategory3",
  //获取对应分类的属性
  GET_ATTR_INFO_LIST: "/admin/product/attrInfoList",
  ADD_ATTR_INFO: "/admin/product/saveAttrInfo",
};
export const reqCategory1 = () => {
  return http.get<object, ResponseDataType>(API.GET_1_CATEGORY);
};
export const reqCategory2 = (id: number) => {
  return http.get<object, ResponseDataType>(API.GET_2_CATEGORY + "/" + id);
};
export const reqCategory3 = (id: number) => {
  return http.get<object, ResponseDataType>(API.GET_3_CATEGORY + "/" + id);
};
export const reqAttrInfoList = (id1: number, id2: number, id3: number) => {
  return http.get<object, ResponseDataType>(
    API.GET_ATTR_INFO_LIST + "/" + id1 + "/" + id2 + "/" + id3
  );
};
export const reqAddAttrInfo = () => {
  return http.post(API.ADD_ATTR_INFO);
};
