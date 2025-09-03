<script setup lang="ts">
import Main from "@/layout/main/index.vue";
import vMenu from "@/layout/menu/menu.vue";
import Tabbar from "@/layout/tabbar/index.vue";
defineProps(["token"]);
defineOptions({
  name: "view-home",
});

</script>

<template>
  <div class="home_container">
    <!-- 左侧菜单 -->
    <div class="home_menu">
      <vMenu></vMenu>
    </div>
    <!-- 顶部导航 -->
    <div class="home_header">
      <Tabbar></Tabbar>
    </div>
    <!-- 展示区 -->
    <div class="home_views">
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
    width: 250px;
    height: 100vh;
    background-color: rgb(41, 37, 41);
  }

  .home_header {
    position: fixed;
    top: 0;
    left: 250px;
    width: calc(100vw - 250px);
    height: 50px;
    color: rgb(41, 37, 41);
    background-color: rgb(255, 235, 248);
  }

  .home_views {
    position: absolute;
    top: 50px;
    left: 250px;
    width: calc(100vw - 250px);
    height: calc(100vh - 50px);
    padding: 20px;
    background-color: rgb(186, 174, 204);
    overflow: auto;
  }
}
</style>
