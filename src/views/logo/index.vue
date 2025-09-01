<script setup lang="ts">
defineOptions({
  name: "view-logo",
});
</script>

<template>
  <div>
    <img src="@/../public/logo.png" alt="" />
    <h2>
      甄选运营(
      <a href="www,github">空白</a>
      版)
    </h2>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  width: 100%;
  color: rgb(156, 108, 255);
  padding: 5px;

  img {
    width: 25%;
  }

  h2 {
    align-content: center;
  }
}
</style>
