import http from "@/utils/http";
import type {
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
export const updateTrademark = (token: string, trademarkItem: ItemType) => {
  //如果有id则是更新品牌
  if (trademarkItem.id) {
    return http.put(API.UPDATE_TRADEMARK_URL, {
      params: {
        token,
        object: {
          id: trademarkItem.id,
          logoUrl: trademarkItem.logoUrl,
          tmName: trademarkItem.tmName,
        },
      },
    });
  } else {
    //如果没有ID则新增品牌
    return http.post(API.ADD_NEW_TRADEMARK_URL, {
      params: {
        token,
        object: {
          logoUrl: trademarkItem.logoUrl,
          tmName: trademarkItem.tmName,
        },
      },
    });
  }
};
