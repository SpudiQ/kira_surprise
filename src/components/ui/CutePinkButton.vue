<template>
  <button class="btn__pink">
    <label>{{ label }}</label>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>