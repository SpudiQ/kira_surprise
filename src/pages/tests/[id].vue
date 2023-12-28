<template>
  <div class="container" v-if="isGettingData">
    <Loader/>
  </div>
  <div class="container" v-else-if="!isGettingData && test?.questions?.length && !isEnded">
    <img :src="currentQuestion?.gif" alt="cutie gif">
    <p v-html="currentQuestion?.question"></p>
    <div v-if="currentQuestion?.input_type === 'boolean'" class="d-flex gap-4">
      <CutePinkButton label="Да" @click="nextQuestion(true)"/>
      <CutePinkButtonRunner label="Нет" @click="negativeAnswers++"/>
    </div>
    <div v-else-if="currentQuestion?.input_type === 'select'" class="d-flex gap-4">
      <CutePinkButton label="Да" @click="nextQuestion(true)"/>
      <CutePinkButtonRunner label="Нет" @click="negativeAnswers++"/>
    </div>
    <CuteTextInput v-model="inputText" @onSubmit="nextQuestion" v-else/>
  </div>
  <div class="container" v-else>
    <p v-html="test.ending"></p>
    <RouterLink to="/">Перейти на главную страницу >>></RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import CutePinkButton from '@/components/ui/CutePinkButton.vue';
import CutePinkButtonRunner from '@/components/ui/CutePinkButtonRunner.vue';
import CuteTextInput from '@/components/ui/CuteTextInput.vue';
import Loader from '@/components/ui/Loader.vue'
import { useToast } from 'vue-toast-notification';
import { POSITIVE_ANSWERS, NEGATIVE_ANSWERS } from '@/static/toast.answers'

const isGettingData = ref(false)
const test = ref(null)
const route = useRoute()
const answers = ref([])
const inputText = ref('')

async function getTest() {
  isGettingData.value = true

  try {
    let { data } = await supabase
    .from('tests')
    .select('*')
    .eq('id', route.params.id)
    .single();

    test.value = data
  } catch(e) {
    console.error(e)
  } finally {
    isGettingData.value = false
  }
}

onMounted(() => {
  getTest()
})

const $toast = useToast();

const negativeAnswers = ref(0)
const currentQuestionNumber = ref(0)
const isEnded = ref(false)

const nextQuestion = async (answer) => {
  console.log('Submitted')

  const nonReactiveCurrentQuestion = {...currentQuestion.value};

  answers.value.push({
    ...nonReactiveCurrentQuestion,
    answer: answer ? answer : inputText.value,
    negativeAnswers: negativeAnswers.value
  });

  currentQuestionNumber.value++;
  inputText.value = '';

  if(currentQuestionNumber.value >= test.value.questions.length) {
    isGettingData.value = true

    try {
      const { data, error } = await supabase
        .from('answers')
        .insert([
          {
            answers: answers.value
          }
        ]);

      if (error) {
        console.error('Error inserting answers:', error);
      } else {
        console.log('Answers inserted successfully:', data);
      }
    } catch (e) {
      $toast.open({
        message: 'Офыбочка какая-то',
        type: 'error',
        position: 'top',
      });
    } finally {
      isGettingData.value = false
    }

    isEnded.value = true
  }
}

const currentQuestion = computed(() => {
  return test.value.questions[currentQuestionNumber.value]
})

const MAX_NEGATIVE_ANSWERS_BEFORE_ERROR = 10;
const NEGATIVE_ANSWERS_INTERVAL_FOR_SUCCESS = 5;
const CHANCE_FOR_SUCCESS_MESSAGE = 0.10; // 25% шанс на успешное сообщение

watch(negativeAnswers, (newNegativeAnswers) => {
  if (newNegativeAnswers > MAX_NEGATIVE_ANSWERS_BEFORE_ERROR) {
    $toast.open({
      message: NEGATIVE_ANSWERS[Math.floor(Math.random() * NEGATIVE_ANSWERS.length)],
      type: 'error',
      position: 'top',
    });
    negativeAnswers.value = 0;
  } else if (
    newNegativeAnswers % NEGATIVE_ANSWERS_INTERVAL_FOR_SUCCESS === 0 &&
    newNegativeAnswers > 0
  ) {
    const randomChance = Math.random();
    if (randomChance <= CHANCE_FOR_SUCCESS_MESSAGE) {
      $toast.open({
        message: POSITIVE_ANSWERS[Math.floor(Math.random() * POSITIVE_ANSWERS.length)],
        type: 'success',
        position: 'top',
      });

      nextQuestion();
    } else {
      $toast.open({
        message: NEGATIVE_ANSWERS[Math.floor(Math.random() * NEGATIVE_ANSWERS.length)],
        type: 'error',
        position: 'top',
      });
    }
  }
});
</script>