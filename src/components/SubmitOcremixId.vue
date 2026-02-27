<template>
  <div class="submit-ocremix-id">
    <input v-model="ocremixId" placeholder="Input ID" />
    <button @click="submitId">Submit</button>
    <p v-if="statusMessage">{{ statusMessage }}</p>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '../store';

const store = useStore();
const ocremixId = ref('');
const statusMessage = ref('');

async function submitId() {
  const id = ocremixId.value.trim();
  if (!id) return;

  try {
    await store.submitRemixForParsing(id);
    statusMessage.value = `Submitted ID ${id} for parsing.`;
    ocremixId.value = '';
  } catch (error) {
    console.error(error);
    statusMessage.value = 'Failed to submit ID.';
  }
}
</script>
<style scoped>
.submit-ocremix-id {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  * {
    margin: 5px;
  }

  input {
    padding: 5px;
  }
  button {
    height: 2em;
  }
}
</style>
