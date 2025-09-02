<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: "#icon-",
  },
  name: String,
  color: {
    type: String,
    default: "gray",
  },
});
</script>

<template>
  <svg>
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script lang="ts">
export default {
  name: "SvgIcon",
};
</script>

<style scoped lang="scss"></style>
