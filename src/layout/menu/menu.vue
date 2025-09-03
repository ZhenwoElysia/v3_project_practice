<script setup lang="ts">
defineOptions({
  name: "view-menu",
});
import logo from "@/layout/menu/logo/logo.vue";
import menuDetails from "@/layout/menu/details/menu-details.vue";
//pinia的user仓库,来获取router
import useUserStore from "@/store/modules/user.ts";
const userStore = useUserStore();
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const openeds = ref<string[]>([]);
const activePath = ref(route.path);

const updateOpeneds = () => {
  const paths = route.path.split('/').filter(Boolean);
  if (paths.length > 1) {
    openeds.value = ["/" + paths[0]];
  } else {
    openeds.value = [];
  }
  activePath.value = route.path;
};
updateOpeneds();

watch(() => route.path, updateOpeneds, { immediate: true });

//拿到路由
const userRoute = reactive(userStore.menuRoutes.options.routes);
</script>

<template>
  <div>
    <logo></logo>
    <el-scrollbar class="scrollbar">
      <el-menu background-color="#292529" text-color="#ffffff" active-text-color="#baaecc" :active="activePath"
        :default-openeds="openeds">
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
