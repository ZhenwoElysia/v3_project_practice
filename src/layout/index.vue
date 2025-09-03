<script setup lang="ts">
import Main from "@/layout/main/main.vue";
import vMenu from "@/layout/menu/menu.vue";
import Tabbar from "@/layout/tabbar/tabbar.vue";
//获取setting仓库，控制侧边栏大小
import useLayoutSettingStore from "@/store/modules/layoutSetting";
const layoutSettingStore = useLayoutSettingStore();
defineOptions({
  name: "view-home",
});
</script>

<template>
  <div class="home_container">
    <!-- 左侧菜单 -->
    <div
      class="home_menu"
      :class="{ fold: layoutSettingStore.isFold ? true : false }"
    >
      <vMenu></vMenu>
    </div>
    <!-- 顶部导航 -->
    <div
      class="home_header"
      :class="{ fold: layoutSettingStore.isFold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 展示区 -->
    <div
      class="home_views"
      :class="{ fold: layoutSettingStore.isFold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<style lang="scss">
.home_container {
  position: relative;
  width: 100vw;
  height: 100vh;

  .home_menu {
    width: 15vw;
    height: 100vh;
    background-color: rgb(41, 37, 41);
    transition: all 0.5s;

    &.fold {
      width: 5vw;
    }
  }

  .home_header {
    position: fixed;
    top: 0;
    left: calc(15vw);
    width: calc(100vw - 15vw);
    height: 50px;
    color: rgb(41, 37, 41);
    background-image: linear-gradient(to right, rgb(255, 255, 255), #ffebf8);
    transition: all 0.5s;

    &.fold {
      left: 5vw;
      width: calc(100vw - 5vw);
    }
  }

  .home_views {
    position: absolute;
    top: 50px;
    left: calc(15vw);
    width: calc(100vw - 15vw);
    height: calc(100vh - 50px);
    padding: 20px;
    background-color: rgb(186, 174, 204);
    overflow: auto;
    transition: all 0.5s;

    &.fold {
      left: 5vw;
      width: calc(100vw - 5vw);
    }
  }
}
</style>
