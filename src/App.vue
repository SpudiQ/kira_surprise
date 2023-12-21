<template>
  <div v-if="currentQuestionNumber < questions.length" class="container">
    <img :src="currentQuestion.gif" alt="cutie gif">
    <p>{{ actualGreeting }}</p>
    <p v-html="currentQuestion.question"></p>
    <div class="d-flex gap-4">
      <CutePinkButton label="Да" @click="nextQuestion"/>
      <CutePinkButtonRunner label="Нет" @click="negativeAnswers++"/>
    </div>
  </div>
  <div v-else class="container">
    <img src="https://media.tenor.com/V88SIKmWvREAAAAi/tkthao219-bunny.gif" alt="cutie gif">
    <p>И жили они вместе счастливо, не зная бед...<br>А сказочке конец, потому что дальше все приватно и вообще счастье любит тишину, вот!</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import CutePinkButton from './components/CutePinkButton.vue';
import CutePinkButtonRunner from './components/CutePinkButtonRunner.vue';
import { useToast } from 'vue-toast-notification';
import { QUESTIONS } from './static/questions';
import { POSITIVE_ANSWERS, NEGATIVE_ANSWERS } from './static/toast.answers'

const $toast = useToast();

const negativeAnswers = ref(0)
const currentQuestionNumber = ref(0)

const questions = ref(QUESTIONS)

const nextQuestion = () => {
  currentQuestionNumber.value++;
}

const currentQuestion = computed(() => {
  return questions.value[currentQuestionNumber.value]
})

const actualGreeting = computed(() => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Доброе утро, любимая!';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Доброго дня, моя сладкая любимая киса!';
  } else if (currentHour >= 18 && currentHour < 24) {
    return 'Добрый вечер, моя сладкая любимая девочка!';
  } else {
    return 'Спокойной ночи, сладкая!';
  }
});

const MAX_NEGATIVE_ANSWERS_BEFORE_ERROR = 10;
const NEGATIVE_ANSWERS_INTERVAL_FOR_SUCCESS = 5;
const CHANCE_FOR_SUCCESS_MESSAGE = 0.30; // 25% шанс на успешное сообщение

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