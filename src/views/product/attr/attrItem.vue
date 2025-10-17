<script setup lang="ts">
defineProps(['attrValue'])
//{id: 4944215272329217, valueName: '安卓手机', attrId: 4944215272329216}
const getRandomNum = (max: number, min: number) => {
  return Math.floor(Math.random() * (max + 1) + min)
}
const colorType = getRandomNum(1, 0)
const choseColor = (colorType: number) => {
  if (colorType) {
    return "background-color:#D6CFE2;"
  } else {
    return "background-color:#FEF2F7;"
  }
}
</script>

<template>
  <div class="attrBox">
    <span class="item" :style="choseColor(colorType)">
      {{ attrValue.valueName }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.attrBox {
  display: inline-flex;
  margin: 5px;
  align-items: center;

  .item {
    margin-right: 10px;
    padding: 3px;
    border-radius: 10px;
  }
}
</style>
