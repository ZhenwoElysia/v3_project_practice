<script setup lang="ts">
defineOptions({ name: "product-trademark" });
import type {
  ResponseDataType,
  ItemType,
  TradeMarkPageResponsType,
} from "@/api/product/trademark/type";
import { onMounted, reactive, ref, watch } from "vue";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
//引入用户仓库,获取token
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
import {
  reqGetTradeMarkWithPages,
  reqGetTradeMark,
  updateTrademark,
} from "@/api/product/trademark/productApi";
const token = userStore.token as string;
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
  //获取分页列表
  trademarkResponse = (await reqGetTradeMarkWithPages(
    token as string,
    pageNum.value,
    limit.value,
  )) as TradeMarkPageResponsType;
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
  //  getTrademarkList()
  // }
  getTrademarkList();
});

//添加与修改品牌
let isDialog = ref(false);
let dialogTitle = ref("");
//新增或修改的item
let trademarkItem = reactive<ItemType>({
  tmName: "",
  logoUrl: "",
});

const addNewTrademarkItem = () => {
  isDialog.value = true;
  dialogTitle.value = "添加品牌";
  trademarkItem.tmName = "";
  trademarkItem.logoUrl = "";
};
//修改已有数据
const changeTrademarkItem = (row: ItemType) => {
  console.log("修改时的row", row);
  isDialog.value = true;
  dialogTitle.value = "修改当前品牌";
  trademarkItem.id = row.id;
  trademarkItem.logoUrl = row.logoUrl;
  trademarkItem.tmName = row.tmName;
};
//在图片上传前调用的钩子
//限定文件的格式大小
const beforePictureUpload: UploadProps["beforeUpload"] = (rawFile) => {
  //上传文件类型
  if (
    rawFile.type === "image/jpeg" ||
    rawFile.type === "image/png" ||
    rawFile.type === "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 5) {
      //上传
      return true;
    } else {
      //图片过大(大于15M)
      ElMessage({
        type: "error",
        message: "上传文件大小必须小于15M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传文件必须为png、jpg、gif",
    });
    return false;
  }
};
//图片上传成功的钩子
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  // uploadFile
) => {
  //收集上传的地址
  trademarkItem.logoUrl = response.data;
};

const cancel = () => {
  isDialog.value = false;
};
//确认上传图片
const comfirm = async () => {
  const result = (await updateTrademark(trademarkItem)) as ResponseDataType;
  console.log("确认时的trademarkItem", trademarkItem);
  console.log("确认时的result", result);
  // 成功上传/修改
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: trademarkItem.id ? "修改品牌成功" : "添加品牌成功",
    });
    //再次发请求，获取全部数据
    await getTrademarkList();
  } else {
    ElMessage({
      type: "error",
      message: result.message,
    });
  }
  isDialog.value = false;
};
</script>
<template>
  <el-card style="width: 90%; height: 95%">
    <el-button
      type="primary"
      size="large"
      icon="Plus"
      @click="addNewTrademarkItem"
      >添加品牌</el-button
    >
    <!-- 添加品牌 -->
    <el-dialog v-model="isDialog">
      <h1>{{ dialogTitle }}</h1>
      <el-form>
        <el-form-item label="输入品牌名称">
          <el-input v-model="trademarkItem.tmName"></el-input>
        </el-form-item>
        <el-form-item label="上传品牌图片">
          <!-- action:图片上传路径，得带/api -->
          <!-- :headers生成请求头，携带token，不然会报207 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :headers="{ token: token }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforePictureUpload"
          >
            <img
              v-if="trademarkItem.logoUrl"
              :src="trademarkItem.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <UploadFilled />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="warning" @click="cancel"> 取消 </el-button>
        <el-button type="primary" @click="comfirm"> 确定 </el-button>
      </template>
    </el-dialog>

    <!-- 显示品牌 -->
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
        <template #default="{ row }">
          <el-button
            type="warning"
            @click="changeTrademarkItem(row)"
            icon="Edit"
          >
          </el-button>
          <el-button type="danger" icon="Delete"> </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
