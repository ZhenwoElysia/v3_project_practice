//登录接口需要携带参数的ts对象

interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}

interface loginDataType {
  token: string | null;
  message: string;
}
interface responseDataType {
  checkUser: userInfo;
}

export interface loginType {
  username: string;
  password: string;
}

export interface retrunLoginType {
  code: number;
  data: loginDataType;
}

export interface retrunResponseType {
  code: number;
  data: responseDataType;
}
