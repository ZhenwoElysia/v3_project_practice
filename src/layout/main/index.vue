<script setup lang="ts">
defineOptions({
  name: "MainLayout"
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级组件的子组件 -->
      <component :is='Component' />
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
</style>
