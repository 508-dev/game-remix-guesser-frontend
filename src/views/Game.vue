<template>
  <div class="game">
    <div class="play-area">
      <button @click="getSong" class="get-song nes-btn">Get a Song</button>

      <Song v-if="showQuestion" :youtubeId="youtubeId" />
      <Answers v-if="showQuestion" />
      <RemixInfo v-if="correctAnswer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { useStore } from '../store';
import Song from '../components/Song.vue';
import Answers from '../components/Answers.vue';
import RemixInfo from '../components/RemixInfo.vue';

const store = useStore();

function getSong() {
  store.getSong();
}

function correctAnswer() {
  return store.correctAnswer();
}
function showQuestion() {
  return this.youtubeId && !this.correctAnswer;
}


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
