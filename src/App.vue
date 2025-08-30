<script setup lang="ts">
//引入图标组件
import { Search } from "@element-plus/icons-vue";
</script>
<template>
  <el-button type="primary" :icon="Search">awd</el-button>
  <SvgIcon name="game" style="width: 36px" color="rgb(196, 183, 215)"></SvgIcon>
  <Test></Test>
  <div>
    <h1>ppp</h1>
  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: red;
  }
}
</style>
