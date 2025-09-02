<script setup lang="ts">

defineProps(["userRoute"])
//[{path:'xxx',compoment:xxx,chirldren:[{xxx}]}.{}]
</script>
<template>

  <template v-for="routeObj in userRoute" :key="routeObj.path">
    <!-- 如果存在路由有二级路由，用sub折叠菜单 -->
    <el-sub-menu v-if="routeObj.children" :index="routeObj.path">
      <!-- 标题 -->
      <template #title>
        <span>{{ routeObj.meta.title }}</span>
      </template>
      <menu-details :userRoute="routeObj.children"></menu-details>
    </el-sub-menu>
    <!-- 如果无子组件，且需要在页面显示 -->
    <el-menu-item v-if="!(routeObj.children) && routeObj.meta.isShowInMenu === true" :index="routeObj.path">
      <span>{{ routeObj.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<style scoped lang="scss"></style>
