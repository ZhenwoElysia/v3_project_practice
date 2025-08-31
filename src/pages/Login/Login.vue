<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import type { loginType } from "@/api/user/type";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router = useRouter()
defineOptions({
  name: "master-login",
});
let isLoading = ref(false)

const userStore = useUserStore()
const user: loginType = reactive({
  username: 'admin',
  password: '111111',
})
const checkUser = async () => {
  isLoading.value = !isLoading.value
  //请求登录
  try {
    //登录成功
    const result = await userStore.userLogin(user)
    console.log(result);
    //弹出提示
    ElMessage({
      type: "success",
      message: result.data.message,
    });
    //跳转到home
    router.push({
      name: 'home',
      params: {
      }
    })
  } catch (err: any) {
    ElMessage({
      type: 'error',
      message: err.data.message
    })
  }
  isLoading.value = !isLoading.value

}

</script>

<template>
  <div class="body">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form action="" class="login_form">
          <h1>Hello</h1>
          <h3>欢迎来到硅谷甄选</h3>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="user.username">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" :prefix-icon="Lock" v-model="user.password" show-password>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="isLoading" class="login_btn" @click="checkUser">
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
  background-image: url('../../assets/images/background.jpg');
  background-repeat: no-repeat;

  .login_form {
    position: relative;
    top: 35vh;
    color: white;
    width: 80%;
    position: relative;
    background-image: url('../../assets/images/login_form.png');
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
