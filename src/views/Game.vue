<template>
  <div class="game">
    <div class="play-area">
      <button @click="getSong" class="get-song nes-btn">Get a Song</button>

      <Song v-if="youtubeId" :youtubeId="youtubeId" />
      <Answers v-if="showQuestion" />
      <RemixInfo v-if="store.correctAnswer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useStore } from '../store';
import Song from '../components/Song.vue';
import Answers from '../components/Answers.vue';
import RemixInfo from '../components/RemixInfo.vue';

const store = useStore();

function getSong() {
  store.getSong();
}

onMounted(() => {
  if (!store.questionPackage) {
    store.getSong();
  }
});

const youtubeId = computed(() => {
  return store.currentQuestionYoutubeId;
});

const showQuestion = computed(() => {
  return youtubeId.value && !store.correctAnswer;
});
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
