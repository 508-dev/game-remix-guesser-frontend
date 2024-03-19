<template>
  <div class="remix-info">
    <div class="info-container nes-container with-title">
      <h3 class="title">Correct! </h3>
      <dl>
        <dt>Origin Game</dt>
        <dd>{{ correctAnswer.origin_game }}</dd>
        <dt>Remixed Song's Title</dt>
        <dd>{{ correctAnswer.original_song_title }}</dd>
        <dt>Remix's Ocremix URL</dt>
        <dd>
          <a :href="correctAnswer.ocremix_remix_url">
            {{ correctAnswer.ocremix_remix_url }}
          </a>
        </dd>
        <dt>Remix Artist</dt>
        <dd>{{ correctAnswer.remix_artist }}</dd>
      </dl>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '../store';
const store = useStore();

const correctAnswer = computed(() => {
  return store.correctAnswer;
})


</script>
<style scoped>

.title {
  background-color: var(--light-cornflower-blue) !important;
}

</style>
