//每个单独属性对象
export interface AttrItemType {
  id: number;
  valueName: string;
  attrId: number;
}
//每个产品的属性对象
//含有多个属性
export interface AttrListType extends AttrItemType {
  id: number;
  attrName: string;
  categoryId: number;
  categoryLevel: number;
  attrValueList: AttrItemType[];
}
export interface ResponseDataType extends AttrListType {
  code: number;
  data?: AttrListType;
  message: string;
  ok: boolean;
}
