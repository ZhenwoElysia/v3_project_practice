<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/layoutSetting";
const layoutSettingStore = useLayoutSettingStore();
defineOptions({
  name: "view-logo",
});
</script>

<template>
  <div>
    <img src="@/assets/logos/logo.png" alt="" />
    <h2 v-show="!layoutSettingStore.isFold">
      甄选运营
      <br />
      (<a href="https://github.com/ZhenwoElysia">空白</a>版)
    </h2>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  width: 100%;
  height: 10vh;
  color: #ff6c94;
  padding: 10px;
  align-items: center;
  overflow: hidden;

  img {
    width: 64px;
    margin-right: 10%;
  }

  h2 {
    white-space: nowrap;
  }
}
</style>
