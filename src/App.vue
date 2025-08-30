<script setup lang="ts">
defineOptions({ name: "App" });
import { RouterView } from "vue-router";
import { ElButton } from "element-plus";
</script>
<template>
  <router-link to="/">
    <ElButton>Home</ElButton>
  </router-link>
  <router-link to="/Login">
    <ElButton>Login</ElButton>
  </router-link>
  <router-link to="/404">
    <ElButton>404</ElButton>
  </router-link>
  <RouterView></RouterView>
</template>

<style scoped lang="scss"></style>
