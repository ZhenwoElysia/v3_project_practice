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
  const paths = route.path.split("/").filter(Boolean);
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

//引入仓库，适当时机折叠菜单
import useLayoutSettingStore from "@/store/modules/layoutSetting";
const layoutSettingStore = useLayoutSettingStore();
</script>

<template>
  <logo></logo>
  <el-scrollbar class="scrollbar">
    <el-menu
      background-color="#292529"
      text-color="#ffffff"
      active-text-color="#baaecc"
      :active="activePath"
      :default-openeds="openeds"
      :collapse="layoutSettingStore.isFold"
    >
      <!-- 利用props来传递参数,实现组件自己的递归 -->
      <menuDetails :userRoute="userRoute"></menuDetails>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.scrollbar {
  text-align: center;
  height: 90vh;
  width: 100%;
}
</style>
