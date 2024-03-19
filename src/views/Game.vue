<template>
  <div class="game">
    <div class="play-area">
      <button @click="getSong" class="get-song nes-btn">Get a Song</button>

      <Song v-if="showQuestion" :youtubeId="youtubeId" />
      <Answers v-if="showQuestion" />
      <RemixInfo v-if="store.correctAnswer" />
      {{store.correctAnswer}}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '../store';
import Song from '../components/Song.vue';
import Answers from '../components/Answers.vue';
import RemixInfo from '../components/RemixInfo.vue';

const store = useStore();

function getSong() {
  store.getSong();
}

const youtubeId = computed(()=>{
  return store.currentQuestionYoutubeId;
});

// const correctAnswer = computed(() => {
//   return store.correctAnswer;
// })
//
const showQuestion = computed(() => {
  return youtubeId && !store.correctAnswer;
})
console.log(showQuestion)


</script>
<style scoped>

.game {
  height: 80vh;
  display: flex;
  justify-content: center;

  .play-area {
    width: 80vw;
  }

  .get-song {
    margin-bottom: 40px;
  }
}

</style>
