<script setup lang="ts">
import { ref, onMounted, onUnmounted, createApp } from "vue";
import smallEleMent from "@/compoments/cursorAbout/smallEleMent.vue";
import getCursorPosition from "@/hooks/getCursorPosition";

const trailBox = ref<null | HTMLDivElement>(null); // 容器
const cursorPosition = getCursorPosition(window, "mousemove");
const handleMouseMove = () => {
  const x = cursorPosition.x;
  const y = cursorPosition.y;

  // 创建挂载点
  const el = document.createElement("div");
  el.style.position = "absolute";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.pointerEvents = "none";

  trailBox.value?.appendChild(el);

  // 动态挂载组件
  const app = createApp(smallEleMent);
  app.mount(el);

  // 0.5 秒后卸载
  setTimeout(() => {
    app.unmount();
    trailBox.value?.removeChild(el);
  }, 500);
};
onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <div ref="trailBox" class="cursor-trail"></div>
</template>
<style scoped>
.cursor-trail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}
</style>
