<template>
  <div class="smallElement"></div>
</template>

<style scoped>
@keyframes disappear {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.smallElement {
  position: absolute;
  z-index: -10000;
  animation: disappear 1s;
  height: 3px;
  width: 3px;
  background-color: rgb(186, 174, 204);
}
</style>
