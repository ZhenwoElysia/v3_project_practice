<script setup lang="ts">
defineOptions({
  name: "MainLayout",
});
import useLayoutSettingStore from "@/store/modules/layoutSetting";
import { nextTick, ref, watch } from "vue";
const layoutSettingStore = useLayoutSettingStore();
//控制当前组件的销毁与否
let isDestroyed = ref(false);
watch(
  () => layoutSettingStore.refresh,
  () => {
    isDestroyed.value = true;
    // 销毁并重新挂载完毕，将isDestroyed重置为false
    nextTick(() => {
      isDestroyed.value = false;
    });
  },
);
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" :key="layoutSettingStore.refresh" />
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-active {
  //消失时迅速，避免页面变形
  transition: all 0s;
}
</style>
