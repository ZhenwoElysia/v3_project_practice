<script setup lang="ts">
defineOptions({
  name: "BreadCrumb",
});
import { computed } from "vue";
import { useRoute } from "vue-router";
//route改变时更改routes
const route = useRoute();
const routes = computed(() => route.matched);

// 得到仓库中的isFold
import useLayoutSettingStore from "@/store/modules/layoutSetting";
const layoutSetingStore = useLayoutSettingStore();
</script>

<template>
  <el-icon @click="layoutSetingStore.changeIsFold">
    <component :is="layoutSetingStore.isFold ? 'ArrowRight' : 'ArrowLeft'" />
  </el-icon>
  <div class="breadcrumb">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item
        v-for="route in routes"
        :to="{ name: route.name }"
        :key="route.path"
      >
        <el-icon>
          <component :is="route.meta.iconName"></component>
        </el-icon>
        {{ route.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped></style>
