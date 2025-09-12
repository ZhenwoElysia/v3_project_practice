<script setup lang="ts">
defineOptions({ name: "product-trademark" });
import type { ItemType, TradeMarkPageResponsType } from "@/api/product/trademark/type";
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
let trademarkList = reactive<ItemType[]>([]);
let pageNum = ref(1); //当前页码
let limit = ref(3); //每页显示的条数
//获取全部列表
let allTrademarks;
let allDatas = ref<ItemType[]>([]); //获取分页的列表
const getTrademarkList = async () => {
  //获取全部列表
  allTrademarks = await reqGetTradeMark(userStore.token as string);
  allDatas.value = allTrademarks.data;
  console.log(allTrademarks);
  //获取分页列表
  trademarkResponse = await reqGetTradeMarkWithPages(token as string, pageNum.value, limit.value) as TradeMarkPageResponsType
  console.log(trademarkResponse);
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
  //分页器页码变化时触发
  // const changePageNum = (currenPage: number) => {
  //   console.log(currenPage);
  //  getTrademarkList()
  // }
  getTrademarkList();
});


//添加品牌
let isDialog = ref(false)


</script>
<template>
  <el-card style="width: 90%; height: 95%">
    <el-button type="primary" size="large" icon="Plus" @click="isDialog = true">添加品牌</el-button>
    <!-- 添加品牌 -->
    <el-dialog v-model="isDialog">
      <h1>添加品牌</h1>
      <el-form>
        <el-form-item label="输入品牌名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="上传品牌图片">
          <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <UploadFilled />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>


    </el-dialog>

    <!-- 显示品牌 -->
    <el-table :data="trademarkList" border stripe height="700" :row-style="{ height: '220px' }">
      <el-table-column label="序号" align="center" width="80px" prop="id" type="index"></el-table-column>
      <el-table-column label="品牌名称" align="center" prop="tmName"></el-table-column>
      <el-table-column label="品牌logo" align="center">
        <template #default="scope">
          <!-- scope:{
              row: TradeMarkItemType//当前行每个品牌的数据
              column: TableColumnCtx<TradeMarkItemType>
              $index: number//对应数组的索引值
          } -->
          <img :src="scope.row.logoUrl" alt="logo" style="
              margin: 0 auto;
              width: 80px;
              height: 40px;
              object-fit: contain;
            " />
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
    <!-- 分页 -->
    <el-pagination v-model:current-page="pageNum" v-model:page-size="limit" :default-page-size="4"
      :page-sizes="[2, 3, 4, 5]" :background="false" layout=" prev, pager, next, jumper,->, total, sizes,"
      :total="allDatas.length" />
  </el-card>
</template>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
