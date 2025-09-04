<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/layoutSetting";
const layoutSettingStore = useLayoutSettingStore();
const makeFullScreen = () => {
  const isFull = document.fullscreenElement; //会返回布尔值，若为全屏则真，反之亦然
  if (!isFull) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// 引入用户的信息（头像）（名字）
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
userStore.getUserInfo();
//引入路由器、路由、跳转，以及携带跳转时的地址
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const logout = () => {
  userStore.logout();
  //退出登录后跳转到登录页面
  router.push({ path: "/login", query: { redirect: route.fullPath } });
};
</script>

<template>
  <!-- 右侧按钮 -->
  <el-button
    type="primary"
    circle
    @click="layoutSettingStore.refresh = !layoutSettingStore.refresh"
  >
    <el-icon>
      <Refresh />
    </el-icon>
  </el-button>
  <el-button type="primary" circle @click="makeFullScreen">
    <el-icon>
      <FullScreen />
    </el-icon>
  </el-button>
  <el-button type="primary" circle>
    <el-icon>
      <Setting />
    </el-icon>
  </el-button>
  <!-- 用户头像 -->
  <img :src="userStore.avatar" alt="" />
  <!-- 退出登录等选项 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      <!-- 用户名 -->
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <!-- 选项内容 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
img {
  margin: 10px;
  height: 100%;
}
</style>
