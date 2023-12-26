<template>
  <router-view v-if="!store.isLoadingRouter"/>
  <Loader v-else class="absolutely-centered"/>
</template>

<script setup>
import { useBaseStore } from '@/store/useBaseStore'
import Loader from '@/components/ui/Loader.vue'

const store = useBaseStore()
</script>