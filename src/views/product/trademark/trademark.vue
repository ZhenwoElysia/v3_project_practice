<script setup lang="ts">
defineOptions({ name: "product-trademark" });
import type { TradeMarkItemType } from "@/api/product/trademark/type";
import { onMounted, reactive } from "vue";
//引入用户仓库,获取token
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
import { reqGetTradeMark } from "@/api/product/trademark/productApi";
const token = userStore.token;
let trademarkList: TradeMarkItemType[] = reactive([]);
onMounted(async () => {
  const trademarkResponse = reactive(await reqGetTradeMark(token as string));
  trademarkList = trademarkResponse.data;
});

//翻页相关的数据
// let pageNum = ref(1)//当前页码
// let pageSize = ref(4)//每页显示的条数
</script>
<template>
  <el-card>
    <el-button type="primary" size="large" icon="Plus">添加品牌</el-button>
    <el-table :data="trademarkList" style="width: 100%" border stripe>
      <el-table-column
        label="序号"
        width="100%"
        align="center"
        prop="id"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        align="center"
        prop="tmName"
      ></el-table-column>
      <el-table-column
        label="品牌logo"
        align="center"
        prop="logoUrl"
      ></el-table-column>
      <el-table-column label="操作" align="center"></el-table-column>
    </el-table>
    <!-- <el-pagination v-model:current-page="pageNum" default-page-size="4" v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]" :background="false" layout=" prev, pager, next, jumper,->, total, sizes,"
        :total="400" /> -->
  </el-card>
</template>

<style lang="scss" scoped></style>
