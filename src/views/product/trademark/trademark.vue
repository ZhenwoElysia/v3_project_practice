<script setup lang="ts">
defineOptions({ name: "product-trademark" });
import type { ItemType } from "@/api/product/trademark/type";
import { onMounted, reactive, ref, watch } from "vue";
//引入用户仓库,获取token
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
import {
  reqGetTradeMarkWithPages,
  reqGetTradeMark,
} from "@/api/product/trademark/productApi";
const token = userStore.token;
let trademarkResponse;
let trademarkList: ItemType[] = reactive([]);
let pageNum = ref(1); //当前页码
let limit = ref(3); //每页显示的条数
//获取全部列表
let allTrademarks;
let allDatas = ref<ItemType[]>([]); //获取分页的列表
const getTrademarkList = async () => {
  //获取全部列表
  allTrademarks = reactive(await reqGetTradeMark(userStore.token as string));
  allDatas.value = allTrademarks.data;
  console.log(allTrademarks);
  //获取分页列表
  trademarkResponse = reactive(
    await reqGetTradeMarkWithPages(token as string, pageNum.value, limit.value),
  );
  trademarkList.splice(
    0,
    trademarkList.length,
    ...trademarkResponse.data.records,
  ); //保证响应式
};
onMounted(async () => {
  getTrademarkList();
});
//切换每页数据数目时
watch([limit, pageNum], () => {
  getTrademarkList();
});
//分页器页码变化时触发
// const changePageNum = (currenPage: number) => {
//   console.log(currenPage);
//  getTrademarkList()
// }
</script>
<template>
  <el-card style="width: 90%; height: 95%">
    <el-button type="primary" size="large" icon="Plus">添加品牌</el-button>
    <el-table
      :data="trademarkList"
      border
      stripe
      height="700"
      :row-style="{ height: '220px' }"
    >
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
      v-model:page-size="limit"
      :default-page-size="4"
      :page-sizes="[2, 3, 4, 5]"
      :background="false"
      layout=" prev, pager, next, jumper,->, total, sizes,"
      :total="allDatas.length"
    />
  </el-card>
</template>

<style lang="scss" scoped></style>
