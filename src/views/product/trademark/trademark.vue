<script setup lang="ts">
defineOptions({ name: "product-trademark" });
import type { TradeMarkItemType } from "@/api/product/trademark/type";
import { onMounted, reactive, ref } from "vue";
//引入用户仓库,获取token
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
import { reqGetTradeMark } from "@/api/product/trademark/productApi";
const token = userStore.token;
let trademarkList: TradeMarkItemType[] = reactive([]);
let pageNum = ref(1); //当前页码
let pageSize = ref(4); //每页显示的条数
onMounted(async () => {
  const trademarkResponse = reactive(await reqGetTradeMark(token as string));
  trademarkList.splice(0, trademarkList.length, ...trademarkResponse.data); //保证响应式
  console.log("trademarkList", trademarkList);
});
//翻页相关的数据
// let pageNum = ref(1)//当前页码
// let pageSize = ref(4)//每页显示的条数
</script>
<template>
  <el-card>
    <el-button type="primary" size="large" icon="Plus">添加品牌</el-button>
    <el-table :data="trademarkList" style="margin: 10px 0" border stripe>
      <el-table-column
        label="序号"
        align="center"
        width="80px"
        prop="id"
        type="index"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        align="center"
        prop="tmName"
      ></el-table-column>
      <el-table-column label="品牌logo" align="center">
        <template #default="scope">
          <!-- scope:{
              row: TradeMarkItemType//当前行每个品牌的数据
              column: TableColumnCtx<TradeMarkItemType>
              $index: number//对应数组的索引值
          } -->
          <img
            :src="scope.row.logoUrl"
            alt="logo"
            style="
              margin: 0 auto;
              width: 80px;
              height: 40px;
              object-fit: contain;
            "
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="">
          <el-button type="warning">
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
          <el-button type="danger">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNum"
      :default-page-size="4"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="false"
      layout=" prev, pager, next, jumper,->, total, sizes,"
      :total="400"
    />
  </el-card>
</template>

<style lang="scss" scoped></style>
