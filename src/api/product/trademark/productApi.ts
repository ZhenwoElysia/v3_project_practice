import http from "@/utils/http";
import type { TradeMarkListType } from "./type";
const API = {
  GET_TRADEMARK_URL: "/admin/product/baseTrademark/getTrademarkList",
};

//获取品牌列表
export const reqGetTradeMark = (token: string) => {
  return http.get<TradeMarkListType>(API.GET_TRADEMARK_URL, {
    params: { token },
  });
};
