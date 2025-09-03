<script setup lang="ts">
import { ref } from 'vue'
defineOptions({
  name: "view-tabbar",
});
let isExpand = ref('Expand');
function changeIcon() {
  isExpand.value = isExpand.value === 'Expand' ? 'Fold' : 'Expand';
}
</script>

<template>
  <div class="tabbar">
    <div class="tabBar_left">
      <el-icon @click="changeIcon">
        <component :is="isExpand" />
      </el-icon>
    </div>
    <div class="tabBar_right">
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
  color: rgb(41, 37, 41);
}
</style>
