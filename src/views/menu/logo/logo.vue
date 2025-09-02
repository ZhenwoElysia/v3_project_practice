<script setup lang="ts">
defineOptions({
  name: "view-logo",
});
</script>

<template>
  <div>
    <img src="@/../public/logo.png" alt="" />
    <h2>
      甄选运营
      <br />
      (<a href="https://github.com/ZhenwoElysia">空白</a>版)
    </h2>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  width: 100%;
  height: 10vh;
  color: #ff6c94;
  padding: 10px;
  align-items: center;

  img {
    width: 25%;
    margin-right: 10%;
  }

  h2 {
    align-content: center;
  }
}
</style>
