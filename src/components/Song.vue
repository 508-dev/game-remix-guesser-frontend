<template>
  <div class="song">
    <div class="youtube-wrapper">
      <youtube :video-id="youtubeId" ref="player" />
    </div>
    <button class="nes-btn is-success" @click="play">Play Song</button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import youtube from '../plugins/vue-youtube';

const props = defineProps(['youtubeId']);

const player = ref(null);

function play() {
  if (player.value) {
    //@ts-ignore
    player.value.player.playVideo();
  }
}
</script>
<style scoped>
.youtube-wrapper {
  display: none;
}
</style>
