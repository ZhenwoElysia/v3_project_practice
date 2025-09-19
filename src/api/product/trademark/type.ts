export interface ResponseDataType {
  code: number;
  data?: object;
  message: string;
  ok: boolean;
}

export interface AllTrademarkResponse extends ResponseDataType {
  data: RecordsType;
}

export interface ItemType {
  id?: number;
  createTime?: string;
  updateTime?: string;
  tmName: string;
  logoUrl: string;
}
export type RecordsType = ItemType[];
//已有品牌的数据类型
export interface TradeMarkPageResponsType extends ResponseDataType {
  data: {
    records: RecordsType;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
