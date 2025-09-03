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
  <img src="@/assets/logos/logo.png" alt="" />
  <!-- 退出登录等选项 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      其他选项
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <!-- 选项内容 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
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
