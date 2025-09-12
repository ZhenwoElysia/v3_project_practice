import http from "@/utils/http";
import type { TradeMarkPageResponsType, AllTrademarkResponse } from "./type";
const API = {
  GET_TRADEMARK_BASE_URL: "/admin/product/baseTrademark",
  GET_ALL_TRADEMARKLIST_URL: "/getTrademarkList",
};

// 获得全部品牌列表
export const reqGetTradeMark = (token: string) => {
  return http.get<object, AllTrademarkResponse>(
    API.GET_TRADEMARK_BASE_URL + API.GET_ALL_TRADEMARKLIST_URL,
    {
      params: {
        token,
      },
    },
  );
};

//获取分页品牌列表
export const reqGetTradeMarkWithPages = (
  token: string,
  page: number,
  limit: number,
) => {
  return http.get<object, TradeMarkPageResponsType>(
    API.GET_TRADEMARK_BASE_URL + `/${page}/${limit}`,
    {
      params: { token, page, limit },
    },
  );
};
