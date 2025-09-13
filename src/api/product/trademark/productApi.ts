import http from "@/utils/http";
import type {
  ResponseDataType,
  TradeMarkPageResponsType,
  AllTrademarkResponse,
  ItemType,
} from "./type";
const API = {
  GET_TRADEMARK_BASE_URL: "/admin/product/baseTrademark",
  GET_ALL_TRADEMARKLIST_URL: "/getTrademarkList",
  ADD_NEW_TRADEMARK_URL: "/admin/product/baseTrademark/save",
  UPDATE_TRADEMARK_URL: "/admin/product/baseTrademark/update",
};

// 获得全部品牌列表
export const reqGetTradeMark = (token: string) => {
  return http.get<object, AllTrademarkResponse>(
    API.GET_TRADEMARK_BASE_URL + API.GET_ALL_TRADEMARKLIST_URL,
    {
      params: {
        token,
      },
    }
  );
};
//获取分页品牌列表
export const reqGetTradeMarkWithPages = (
  token: string,
  page: number,
  limit: number
) => {
  return http.get<object, TradeMarkPageResponsType>(
    API.GET_TRADEMARK_BASE_URL + `/${page}/${limit}`,
    {
      params: { token, page, limit },
    }
  );
};
//修改品牌
//如果有id则为修改，如果没有则添加
export const updateTrademark = (trademarkItem: ItemType) => {
  //如果有id则是更新品牌
  if (trademarkItem.id) {
    console.log("更新");
    return http.put(API.UPDATE_TRADEMARK_URL, trademarkItem);
  } else {
    //如果没有ID则新增品牌
    console.log("新增");
    return http.post<object, ResponseDataType>(
      API.ADD_NEW_TRADEMARK_URL,
      trademarkItem
    );
  }
};
