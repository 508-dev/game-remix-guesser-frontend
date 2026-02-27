<template>
  <div class="submit-ocremix-id">
    <input v-model="secretId" placeholder="Input Secret ID" />
    <input v-model="publicId" placeholder="Input Public ID" />
    <button @click="submitIds">Check</button>
    <p v-if="statusMessage">{{ statusMessage }}</p>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '../store';

const store = useStore();
const secretId = ref('');
const publicId = ref('');
const statusMessage = ref('');

async function submitIds() {
  const data = {
    public_id: Number(publicId.value),
    secret_id: Number(secretId.value)
  };

  if (!Number.isFinite(data.public_id) || !Number.isFinite(data.secret_id)) {
    statusMessage.value = 'Both IDs must be valid numbers.';
    return;
  }

  try {
    const result = await store.checkAnswer(data);
    statusMessage.value = result ? 'Answer check completed.' : 'No response returned.';
  } catch (error) {
    console.error(error);
    statusMessage.value = 'Failed to check IDs.';
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
