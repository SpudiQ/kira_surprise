<template>
  <div class="container">
    <nav v-if="!isGettingData" class="nav_cards">
      <RouterLink v-for="test in tests" :key="test.id" :to="`/tests/${test.id}`" class="nav_card__wrapper">
        <!-- <img src="https://w.forfun.com/fetch/25/2529ce3d3391789f369c4ec9a07a1b82.jpeg" alt="Картинка карточки"/> -->
        <h2>{{ test.name }}</h2>
      </RouterLink>
    </nav>
    <Loader v-else/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import Loader from '@/components/ui/Loader.vue'

const tests = ref(null)
const isGettingData = ref(false)

async function getTests() {
  isGettingData.value = true

  try {
    let { data } = await supabase
    .from('tests')
    .select('*');

    tests.value = data
  } catch(e) {
    console.error(e)
  } finally {
    isGettingData.value = false
  }
}

onMounted(() => {
  getTests()
})
</script>