<script setup lang="ts">
defineOptions({
  name: "view-menu",
});
import logo from "@/views/menu/logo/logo.vue";
import menuDetails from '@/views/menu/details/menu-details.vue'
//pinia的user仓库,来获取router
import useUserStore from '@/store/modules/user.ts';
const userStore = useUserStore()
import { reactive } from 'vue';
//拿到路由
const userRoute = reactive(userStore.menuRoutes.options.routes)
</script>

<template>
  <div>
    <logo></logo>
    <el-scrollbar class="scrollbar">
      <el-menu>
        <!-- 利用props来传递参数,实现组件自己的递归 -->
        <menuDetails :userRoute="userRoute"></menuDetails>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.scrollbar {
  text-align: center;
  height: 90vh;
  width: 100%;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
