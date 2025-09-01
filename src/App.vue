<script setup lang="ts">
defineOptions({ name: "App" });
//引入鼠标拖尾
import cursorTrail from "./compoments/cursorAbout/cursorTrail.vue";
</script>

<template>
  <cursorTrail></cursorTrail>
  <router-view></router-view>
</template>

<style scoped lang="scss"></style>
