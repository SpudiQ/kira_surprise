<template>
  <div class="input__pink">
    <input v-model="inputText" type="text" :placeholder="placeholder"/>
    <button @click="onSubmit" type="submit"><i class="icon ion-android-arrow-forward"></i></button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  placeholder: {
    type: String
  }
})

const emit = defineEmits(['onSubmit'])

const inputText = ref()

const onSubmit = () => {
  emit('onSubmit', inputText.value)
}
</script>