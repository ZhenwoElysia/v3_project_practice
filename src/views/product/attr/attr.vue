<script setup lang="ts">
import attrItem from "./attrItem.vue"
defineOptions({ name: "product-attr" });
import {
  reqCategory1,
  reqCategory2,
  reqCategory3,
  reqAttrInfoList,
  // reqAddAttrInfo,
} from "@/api/product/attr/attr";
// import type { AttrListType } from "@/api/product/attr/type";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

let attrInfoList = ref();//数组
//0:{id:4,attrName:'手机一级',categoryId:61,categoryLevel:3,attrValueList:Array(4)}

//分类
let category1Selection = ref();
let category1OptionList = ref();
let category2Selection = ref(category1Selection.value);
let category2OptionList = ref();
let category3Selection = ref(category2Selection.value);
let category3OptionList = ref();

//初始化一级分类未选择，二三级分类被ban
let isC2Dsiabled = ref(true);
let isC3Dsiabled = ref(true);

onMounted(async () => {
  //在进入页面立即获取一级分类
  const category1Res = await reqCategory1();

  if (category1Res.code !== 200) {
    ElMessage({
      type: "error",
      message: "获取一级分类失败，请检查网络",
    });
  } else {
    //得到一级分类
    category1OptionList.value = category1Res.data;
  }
});
//一级分类改变
const get2nd = async () => {
  //清空和解锁
  //先清空二级三级分类内容
  category2Selection.value = null;
  category3Selection.value = null;
  //解锁二级分类
  isC2Dsiabled.value = false;
  //ban掉三级选择
  isC3Dsiabled.value = true;

  //业务逻辑
  //确认存在
  if (category1Selection.value) {
    //发送请求获取二级分类
    const c2Res = await reqCategory2(category1Selection.value);
    if (c2Res.code !== 200) {
      ElMessage({
        type: "error",
        message: "获取二级分类失败，请检查网络",
      });
    } else {
      category2OptionList.value = c2Res.data;
    }
  }
};
//二级分类改变
const get3nd = async () => {
  //解锁三级分类
  isC3Dsiabled.value = false;
  //先清空三级分类内容
  category3Selection.value = null;

  if (category1Selection.value && category2Selection.value) {
    //发送请求获取三级分类
    const c3Res = await reqCategory3(category2Selection.value);
    if (c3Res.code !== 200) {
      ElMessage({
        type: "error",
        message: "获取三级分类失败，请检查网络",
      });
    } else {
      category3OptionList.value = c3Res.data;
    }
  }
};
//三级分类改变(确定选择)
const getProAttr = async () => {
  if (
    category1Selection.value &&
    category2Selection.value &&
    category3Selection.value
  ) {
    //发送请求获取该产品的全部属性
    const infoListRes = await reqAttrInfoList(
      category1Selection.value,
      category2Selection.value,
      category3Selection.value,
    );

    attrInfoList.value = infoListRes.data
    console.log("attrInfoList", attrInfoList);
  }
};

//添加属性
const addNewAttr = () => { };
</script>

<template>
  <!-- 分类 -->
  <el-card style="max-width: 95%; margin-bottom: 3vh">
    <div class="categorys">
      <!-- 一级分类 -->
      <div class="category">
        <span class="category-title">一级分类：</span>
        <el-select v-model="category1Selection" @change="get2nd" placeholder="请选择一级分类">
          <el-option v-for="item in category1OptionList" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </div>

      <!-- 二级分类 -->
      <div class="category">
        <span class="category-title">二级分类：</span>
        <el-select v-model="category2Selection" @change="get3nd" :disabled="isC2Dsiabled" :placeholder="category1Selection ? '请选择二级分类' : '请选择一级分类'
          ">
          <el-option v-for="item in category2OptionList" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </div>

      <!-- 三级分类 -->
      <div class="category">
        <span class="category-title">三级分类：</span>
        <el-select v-model="category3Selection" @change="getProAttr" :disabled="isC3Dsiabled" :placeholder="category2Selection
          ? '请选择三级分类'
          : category1Selection
            ? '请选择二级分类'
            : '请选择一级分类'
          ">
          <el-option v-for="item in category3OptionList" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </div>
    </div>
  </el-card>

  <!-- 展示 -->
  <el-card style="max-width: 95%; height: 75vh">
    <el-button @click="addNewAttr" type="primary">添加属性</el-button>
    <!-- 属性斩首的具体表格 -->
    <el-table :data="attrInfoList" stripe border style="margin: 1vh 0">
      <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
      <el-table-column label="属性名称" width="100px" prop="attrName" align="center"></el-table-column>
      <el-table-column label="属性值名称">
        <template #default="scope">
          <!-- scope:{
            row://当前行品牌的数据
            column: TableColumnCtx<TradeMarkItemType>
            $index: number//对应数组的索引值
        } -->
          <attrItem v-for="item in scope.row.attrValueList" :attrValue="item" :key="item.id"></attrItem>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <el-button type="warning" icon="Edit"></el-button>
        <el-button type="danger" icon="Delete"></el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped>
.categorys {
  display: flex;
  height: 5vh;
}

.category {
  display: flex;
  width: 30%;
  align-items: center;
  margin: 0 auto;

  .category-title {
    width: 29%;
  }
}
</style>
