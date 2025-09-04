<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useUserStore from "@/store/modules/user";
import type { loginType, retrunLoginType } from "@/api/user/type";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getHour } from "@/utils/time";
const router = useRouter();
const route = useRoute();
defineOptions({
  name: "master-login",
});
let isLoading = ref(false);

//登录
const userStore = useUserStore();
const user = reactive<loginType>({
  username: "admin",
  password: "111111",
});
//先进行检查
//需要规则的数据//对表单字段进行检查
//                     校验数组对象，得到的值              放行函数，通过调用放行
const checkUserName = (
  _rules: object[],
  value: string,
  callBack: (error?: string | Error) => void,
) => {
  if (/^[A-Za-z0-9]{5,15}$/.test(value)) {
    callBack();
  } else {
    callBack("用户名长度大于等于5小于16且含有数字和字母");
  }
};
const checkPassword = (
  _rules: object[],
  value: string,
  callBack: (error?: string | Error) => void,
) => {
  if (/^[A-Za-z0-9._'`@#&*]{6,15}$/.test(value)) {
    callBack();
  } else {
    callBack(
      "密码长度必须大于等于六位小于十六位，只能含有数字大小写字母和符号._'`@#&*",
    );
  }
};
const rules = {
  username: [
    // { min: 5, message: "用户名至少有五位", trigger: "blur" }//校验规则
    { validator: checkUserName, trigger: "change" },
  ],
  password: [
    // { min: 6, message: "密码长度至少为6位", trigger: "change" }
    { validator: checkPassword, trigger: "change" },
  ],
};
const loginForms = ref();

const checkUser = async () => {
  isLoading.value = !isLoading.value;

  //发送请求前保证字段符合
  await loginForms.value.validate();
  //请求登录
  try {
    //登录成功
    const result = await userStore.userLogin(user);
    //{code:200,data{message:'登录成功',token:xxx}}
    //弹出提示
    const nowTimeStr = getHour(); //获取当前时间(早中晚)
    //跳转到home
    router.push({
      path: route.query.redirect || "/Home",
    });
    ElNotification({
      type: "success",
      message: result.data.message,
      title: "hi，" + nowTimeStr + "好",
    });
  } catch (err) {
    const error = err as retrunLoginType;
    ElNotification({
      type: "error",
      message: error.data.message,
    });
  }
  isLoading.value = !isLoading.value;
};
</script>

<template>
  <div class="body">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          action=""
          class="login_form"
          :model="user"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h3>欢迎来到硅谷甄选</h3>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="user.username"> </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="user.password"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="isLoading"
              class="login_btn"
              @click="checkUser"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-image: url("../../assets/images/background.jpg");
  background-repeat: no-repeat;

  .login_form {
    position: relative;
    top: 35vh;
    color: white;
    width: 80%;
    position: relative;
    background-image: url("../../assets/images/login_form.png");
    background-size: cover;
    padding: 40px;

    h1 {
      font-size: 40px;
    }

    h3 {
      font-size: 25px;
    }

    .login_btn {
      margin: 0 auto;
      width: 80%;
    }
  }
}
</style>
