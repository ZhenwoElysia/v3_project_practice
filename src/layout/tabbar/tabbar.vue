<script setup lang="ts">
import breadcrumb from "./breadcrumb/breadcrumb.vue";
import setting from "./userSetting/userSetting.vue";
defineOptions({
  name: "view-tabbar",
});
</script>
<template>
  <div class="tabbar">
    <div class="tabBar_left">
      <breadcrumb></breadcrumb>
    </div>
    <div class="tabBar_right">
      <setting></setting>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tabBar_left {
    display: flex;

    .breadcrumb {
      margin-left: 10px;
    }
  }

  .tabBar_right {
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
  }
}
</style>
