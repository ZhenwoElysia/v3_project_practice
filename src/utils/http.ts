import axios from "axios";
import { ElMessage } from "element-plus";
const request = axios.create({
  //基础路径会携带/api      引入的环境变量
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000, //超时的时间
});

//给request实例添加请求拦截器
request.interceptors.request.use((config) => {
  //请求头config.headers,给服务器端携带公共参数
  //必须返回配置对象
  return config;
});
//给request实例添加响应拦截器
request.interceptors.response.use(
  //成功的回调
  (response) => {
    return response.data;
  },
  //失败的回调
  (error) => {
    //一般处理http网络错误
    let message = "";
    //获取错误码
    const status = error.response.status;
    switch (status) {
      case 401: {
        message = "token过期";
        break;
      }
      case 403: {
        message = "当前账户权限不足";
        break;
      }
      case 404: {
        message = status + error.response.statusText;
        break;
      }
      case 500: {
        message = "服务器未响应";
        break;
      }
      default: {
        message = "未知错误";
      }
    }

    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  },
);
export default request;
