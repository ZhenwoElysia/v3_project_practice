<script setup lang="ts">
defineOptions({ name: "product-trademark" });
import type {
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
  //获取分页列表
  trademarkResponse = (await reqGetTradeMarkWithPages(
    token as string,
    pageNum.value,
    limit.value,
  )) as TradeMarkPageResponsType;
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
let isDialog = ref(false);
//新增或修改的item
let tradmarkItem = reactive<ItemType>({
  id: 0,
  tmName: '',
  logoUrl: ''
})

//在图片上传前调用的钩子
//限定文件的格式大小
const beforePictureUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //上传文件类型
  if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 15) {
      //上传
      return true
    } else {
      //图片过大(大于15M)
      ElMessage({
        type: 'error',
        message: '上传文件大小必须小于15M'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件必须为png、jpg、gif'
    })
    return false
  }
}
//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  // uploadFile
) => {
  //收集上传的地址
  tradmarkItem.logoUrl = response.data
}


const cancel = () => {
  isDialog.value = false
}
const comfirm = () => {
  isDialog.value = false
}


</script>
<template>
  <el-card style="width: 90%; height: 95%">
    <el-button type="primary" size="large" icon="Plus" @click="isDialog = true">添加品牌</el-button>
    <!-- 添加品牌 -->
    <el-dialog v-model="isDialog">
      <h1>添加品牌</h1>
      <el-form>
        <el-form-item label="输入品牌名称">
          <el-input v-model="tradmarkItem.tmName"></el-input>
        </el-form-item>
        <el-form-item label="上传品牌图片">
          <!-- action:图片上传路径，得带/api -->
          <!-- :headers生成请求头，携带token，不然会报207 -->
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload?token:" :headers="{ token: token }"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforePictureUpload">
            <img v-if="tradmarkItem.logoUrl" :src="tradmarkItem.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <UploadFilled />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="warning" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" @click="comfirm">
          确定
        </el-button>
      </template>
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
