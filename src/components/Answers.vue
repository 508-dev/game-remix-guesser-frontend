<template>
  <div class="answers nes-container with-title">
    <transition name="slide-fade" mode="out-in">
      <h3 id="answer-area-title" class="title" :key="titleText">
        {{ titleText }}
      </h3>
    </transition>
    <ul class="answer-list-area" role="radiogroup" aria-labelledby="answer-area-title">
      <li v-for="choice in choices" :key="choice.public_id">
        <label>
          <input
            class="nes-radio"
            type="radio"
            name="choice"
            v-model="selectedChoice"
            :value="choice.public_id"
          />
          <span>{{ choice.origin_game }}</span>
        </label>
      </li>
    </ul>
    <button
      class="nes-btn"
      :class="{ 'is-disabled': !selectedChoice }"
      :disabled="!selectedChoice"
      @click="submitAnswer"
    >
      Submit Answer
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '../store';
import { ref, computed, watch } from 'vue';
const store = useStore();

const selectedChoice = ref('');
let submitted = ref(false);
const choices = computed(() => {
  return store.currentQuestionChoices;
});
const hasCheckedAnswer = computed(() => {
  return store.hasCheckedAnswer;
});

const titleText = computed(() => {
  if (submitted.value) {
    return 'Checking...';
  }
  if (hasCheckedAnswer.value) {
    return 'Sorry, wrong! Which game is this from?';
  }
  return 'Which game is this from?';
});

function submitAnswer() {
  store.hasCheckedAnswer = false;
  submitted.value = true;
  store.submitAnswer();
}

watch(selectedChoice, (newSelection) => {
  store.selectedAnswer = Number(newSelection);
});

watch(hasCheckedAnswer, (isChecked) => {
  if (isChecked) {
    submitted.value = false;
  }
});
</script>
<style scoped>
.answers {
  margin-top: 30px;
}

ul,
li {
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}
.nes-radio:checked:focus + span::before {
  color: black;
}
.title {
  background-color: var(--light-cornflower-blue) !important;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  /* transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
  transition: all 0.2s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: rotate(1turn);
  opacity: 1;
}
</style>
