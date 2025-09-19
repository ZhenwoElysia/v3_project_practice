<script setup lang="ts">
defineOptions({ name: "product-attr" });
import { reqCategory1 } from "@/api/product/attr/attr";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

//分类
//一级分类
let category1s = ref();
let category1Selection = ref("");
onMounted(async () => {
  //在进入页面立即获取一级分类
  const category1Res = await reqCategory1();
  category1s.value = category1Res.data;
  console.log(category1Res);
  if (category1Res.code !== 200) {
    ElMessage({
      type: "error",
      message: "获取分类失败，请检查网络",
    });
  }
});
</script>

<template>
  <el-card style="max-width: 95%">
    <!-- 分类 -->
    <div class="categorys">
      <!-- 一级分类 -->
      <div class="category">
        <span class="category-title">一级分类：</span>
        <el-select v-model="category1Selection">
          <el-option
            v-for="item in category1s"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>

      <!-- 二级分类 -->
      <div class="category">
        <span class="category-title">二级分类：</span>
        <el-select>
          <!-- <el-option></el-option> -->
        </el-select>
      </div>

      <!-- 三级分类 -->
      <div class="category">
        <span class="category-title">三级分类：</span>
        <el-select>
          <!-- <el-option></el-option> -->
        </el-select>
      </div>
    </div>
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
