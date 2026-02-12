<template>
  <div class="song">
    <div class="youtube-wrapper">
      <youtube
        :video-id="youtubeId"
        ref="player"
        @ready="onReady"
        @paused="onPaused"
        @ended="onPaused"
        @playing="onPlaying"
        @buffering="onBuffering"
      />
    </div>
    <button class="nes-btn" :class="buttonClass" :disabled="isBuffering" @click="toggle">
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import youtube from '../plugins/vue-youtube';

const isBuffering = ref(false);
const isPlaying = ref(false);

const { youtubeId } = defineProps<{ youtubeId: string }>();

const player = ref<InstanceType<typeof youtube> | null>(null);

const buttonClass = computed(() => {
  if (isBuffering.value) return 'is-disabled';
  return isPlaying.value ? 'is-error' : 'is-success';
});

const buttonLabel = computed(() => {
  if (isBuffering.value) return 'Buffering...';
  return isPlaying.value ? 'Pause Song' : 'Play Song';
});

function play() {
  const youTubePlayer = getYouTubePlayer();
  if (!youTubePlayer) return;
  youTubePlayer.playVideo();
}

function onPlaying() {
  isPlaying.value = true;
  isBuffering.value = false;
}

function onPaused() {
  isPlaying.value = false;
  isBuffering.value = false;
}

function onBuffering() {
  isBuffering.value = true;
}

function onReady() {
  play();
}

function getYouTubePlayer() {
  return player.value?.player ?? null;
}

function toggle() {
  const youTubePlayer = getYouTubePlayer();

  if (!youTubePlayer) return;

  if (isPlaying.value) {
    youTubePlayer.pauseVideo();
  } else {
    youTubePlayer.playVideo();
  }
}
</script>
<style scoped>
.youtube-wrapper {
  display: none;
}
</style>
