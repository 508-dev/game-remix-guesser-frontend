<template>
  <div class="generate-question">
    <button @click="generateQuestion">Generate</button>
    <button class="seed" @click="seedDB">Seed</button>
    <p v-if="statusMessage">{{ statusMessage }}</p>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '../store';

const store = useStore();
const statusMessage = ref('');

async function generateQuestion() {
  try {
    await store.getSong();
    statusMessage.value = 'Generated a new question.';
  } catch (error) {
    console.error(error);
    statusMessage.value = 'Failed to generate a question.';
  }
}

async function seedDB() {
  try {
    await store.seedDB();
    statusMessage.value = 'Seed request submitted.';
  } catch (error) {
    console.error(error);
    statusMessage.value = 'Failed to seed database.';
  }
}
</script>
<style scoped>
.generate-question {
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    margin: 5px;
  }

  button {
    height: 2em;
    background-color: #cdf4ff;
    &.seed {
      background-color: #cef400;
    }
  }
}
</style>
