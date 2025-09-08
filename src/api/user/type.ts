//后端返回数据的ts类型
export interface responseType {
  code: number;
  //用户信息对象
  data: userInfoType;
  message: string;
  ok: boolean;
}

//登录成功返回的数据ts类型
export interface returnLoginType {
  code: number;
  data: string;
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
