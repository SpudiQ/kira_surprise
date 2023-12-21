<template>
  <div class="toast__container">
    <div v-for="toast in toasts" :key="toast.id" class="toast__wrapper" :class="toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>

import { ToastSymbol } from '../plugins/ToastPlugin';

const { toasts } = inject(ToastSymbol);


</script>

<style scoped>
.toast__container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.toast__wrapper {
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
}

.toast__wrapper.error {
  background-color: #ff6b6b;
}

.toast__wrapper.notification {
  background-color: #4CAF50;
}
</style>
