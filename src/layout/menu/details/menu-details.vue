<script setup lang="ts">
import { useRouter } from "vue-router";
defineProps(["userRoute"]);
interface MenuItemRegistered {
  index: string;
  indexPath: string[];
  active: boolean;
}
const router = useRouter();
const goRoute = (vc: MenuItemRegistered) => {
  router.push({ name: vc.index });
};
//[{path:'xxx',compoment:xxx,chirldren:[{xxx}]}.{}]
</script>
<template>
  <template v-for="routeObj in userRoute" :key="routeObj.path">
    <!-- 如果存在路由有二级路由，用sub折叠菜单 -->
    <el-sub-menu
      v-if="routeObj.children && routeObj.children.length > 1"
      :index="routeObj.name"
    >
      <!-- 标题 -->
      <template #title>
        <el-icon v-if="routeObj.meta.iconName">
          <component :is="routeObj.meta.iconName"></component>
        </el-icon>
        <span>{{ routeObj.meta.title }}</span>
      </template>
      <!-- 组件内部调用自己形成递归,将子路由传给下一级 -->
      <menu-details :userRoute="routeObj.children"></menu-details>
    </el-sub-menu>
    <!-- 如果无子组件，且需要在页面显示 -->
    <el-menu-item
      v-if="!routeObj.children && routeObj.meta.isShowInMenu === true"
      :index="routeObj.name"
      @click="goRoute"
    >
      <el-icon>
        <component :is="routeObj.meta.iconName"></component>
      </el-icon>
      <span>{{ routeObj.meta.title }}</span>
    </el-menu-item>
    <!-- 有或者只有一个chilrdren -->
    <el-menu-item
      v-if="
        routeObj.children &&
        routeObj.children.length === 1 &&
        routeObj.children[0].meta.isShowInMenu === true
      "
      :index="routeObj.name"
      @click="goRoute"
    >
      <el-icon>
        <component :is="routeObj.meta.iconName"></component>
      </el-icon>
      <span>{{ routeObj.children[0].meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<style scoped lang="scss"></style>
