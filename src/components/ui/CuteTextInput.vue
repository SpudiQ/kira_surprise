<template>
  <div class="input__pink">
    <input v-model="internalValue" type="text" :placeholder="placeholder"/>
    <button @click="onSubmit" type="submit"><i class="icon ion-android-arrow-forward"></i></button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

defineProps({
  placeholder: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue', 'onSubmit'])

const internalValue = ref('');

const onSubmit = () => {
  emit('update:modelValue', internalValue.value);
  emit('onSubmit')
  internalValue.value = '';
};

const modelValue = computed({
  get: () => internalValue.value,
  set: (value) => {
    internalValue.value = value;
    emit('update:modelValue', value);
  }
});
</script>