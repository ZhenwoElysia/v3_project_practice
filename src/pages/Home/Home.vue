<script setup lang="ts">
defineOptions({
  name: "master-home",
});
defineProps(['token'])

</script>

<template>
  <h1>我是Home</h1>
  <h2>当前用户是{{ token }}</h2>
</template>

<style lang="scss"></style>
