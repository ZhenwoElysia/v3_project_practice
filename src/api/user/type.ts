//后端返回数据的ts类型
export interface responseType {
  code: number;
  //可能是用户信息对象，也可能是错误信息字符串或token
  data: userInfoType | string; //具体情况需要断言
  message: string;
  ok: boolean;
}
//用户信息的ts类型
export interface userInfoType {
  name: string;
  avatar: string;
  buttons: string[];
  roles: Array<string>;
  routes: string[];
}
//登录接口参数的ts类型
export interface loginType {
  username: string;
  password: string;
}
