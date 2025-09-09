export interface TradeMarkResponseType {
  code: number;
  data: TradeMarkItemType[];
  message: string;
  ok: boolean;
}
export interface TradeMarkItemType {
  id: number;
  logoUrl: string;
  tmName: string;
}
