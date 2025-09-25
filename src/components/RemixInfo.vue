<template>
  <div class="remix-info">
    <div class="info-container nes-container with-title">
      <h3 class="title">Correct!</h3>
      <dl v-if="correctAnswer">
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
        <dd>
          <a v-if="artistUrl" :href="artistUrl" target="_blank" rel="noopener noreferrer">
            {{ correctAnswer.remix_artist }}
          </a>
          <span v-else>{{ correctAnswer.remix_artist }}</span>
        </dd>
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
});

const artistUrl = computed(() => {
  const ca = correctAnswer.value;
  if (!ca) return null;

  const url = ca.remix_artist_ocremix_url as string | undefined;
  if (url && url.length > 0) {
    if (url.startsWith('http')) return url;
    // Normalize relative OCRemix paths like "/artist/4279/djpretzel"
    return `https://ocremix.org${url.startsWith('/') ? url : '/' + url}`;
  }
  return null;
});
</script>
<style scoped>
.title {
  background-color: var(--light-cornflower-blue) !important;
}
</style>
