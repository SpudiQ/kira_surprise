<template>
  <transition name="move-fade" @before-enter="beforeEnter" @after-enter="afterEnter">
    <button class="btn__pink" @click="moveButton" ref="buttonRef">
      <label>{{ label }}</label>
    </button>
  </transition>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})

import { ref } from 'vue';

const buttonRef = ref(null);
const isRunning = ref(false);

const moveButton = () => {
  isRunning.value = true;

  const button = buttonRef.value;
  const maxX = window.innerWidth - button.offsetWidth;
  const maxY = window.innerHeight - button.offsetHeight;

  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  button.style.transition = 'left 0.5s ease, top 0.5s ease';
  button.style.position = 'absolute'
  button.style.left = `${newX}px`;
  button.style.top = `${newY}px`;
};

const beforeEnter = (el) => {
  el.style.opacity = 0.5;
};

const afterEnter = (el) => {
  setTimeout(() => {
    el.style.opacity = 1;
    el.style.transition = '';
    isRunning.value = false;
  }, 10);
};
</script>