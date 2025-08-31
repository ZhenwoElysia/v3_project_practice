//mock/user.ts
function createUser() {
  return [
    {
      userId: 1,
      avator: "//url",
      username: "admin",
      password: "111111",
      desc: "平台管理员",
      roles: ["平台管理员"],
      buttons: ["cuser.detail"],
      routes: ["home"],
      token: "Admin Token",
    },
    {
      userId: 2,
      avator: "//url",
      username: "system",
      password: "111111",
      desc: "系统管理员",
      buttons: ["cuser.detail", "cuser.user"],
      routes: ["home"],
      token: "System Token",
    },
  ];
}
export default [
  //用户登录接口
  {
    url: "/api/user/login",
    method: "post",
    response: ({ body }) => {
      const { username, password } = body;
      //检查用户名和密码
      const checkUser = createUser().find(
        (item) => item.username === username && item.password === password,
      );
      //如果不存在该用户
      if (!checkUser) {
        return {
          code: 201,
          data: { message: "账号或密码不正确" },
        };
      }
      //存在用户
      const { token } = checkUser;
      return {
        code: 200,
        data: { token, message: "登录成功" },
      };
    },
  },
  //获取用户信息
  {
    url: "/api/user/info",
    method: "get",
    response: (request) => {
      const token = request.headers.token;
      const checkUser = createUser().find((item) => item.token === token);
      if (!checkUser) {
        return {
          code: 201,
          data: { message: "账号或密码不正确" },
        };
      }
      //存在用户
      return { code: 200, data: { checkUser } };
    },
  },
];
