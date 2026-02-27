import { fetchApi } from './fetch';
import type { Choice, CorrectAnswer, QuestionPackage } from './types';

import { defineStore } from 'pinia';

// In which I question whether typescript is really worth the headache
function getYoutubeIdFromUrl(url: string) {
  const blah = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return blah[2] !== undefined ? blah[2].split(/[^0-9a-z_-]/i)[0] : blah[0];
}

async function throwIfNotOk(response: Response) {
  if (response.ok) return;

  let details = '';
  try {
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      const payload: unknown = await response.json();
      if (typeof payload === 'string') {
        details = payload;
      } else if (payload && typeof payload === 'object') {
        const objectPayload = payload as Record<string, unknown>;
        const message = objectPayload.message ?? objectPayload.error ?? objectPayload.detail;
        details = typeof message === 'string' ? message : JSON.stringify(payload);
      }
    } else {
      details = await response.text();
    }
  } catch {
    details = '';
  }

  const statusText = response.statusText || 'Request Failed';
  throw new Error(
    details
      ? `HTTP ${response.status} ${statusText}: ${details}`
      : `HTTP ${response.status} ${statusText}`
  );
}

export interface State {
  questionPackage: QuestionPackage | null;
  selectedAnswer: number | null;
  correctAnswer: CorrectAnswer | null;
  hasCheckedAnswer: boolean;
}

export const useStore = defineStore('store', {
  state: (): State => {
    return {
      questionPackage: null,
      selectedAnswer: null,
      correctAnswer: null,
      hasCheckedAnswer: false
    };
  },
  getters: {
    currentQuestionYoutubeId: (state: State): string | null => {
      if (state.questionPackage?.question?.remix_youtube_url) {
        return getYoutubeIdFromUrl(state.questionPackage.question.remix_youtube_url);
      }
      return null;
    },
    currentQuestionChoices: (state: State): Choice[] | null => {
      if (state.questionPackage?.choices?.length) {
        return state.questionPackage.choices;
      }
      return null;
    }
  },
  actions: {
    async submitRemixForParsing(id: string) {
      const response = await fetchApi(`/parse/${id}`);
      await throwIfNotOk(response);
      return response.json();
    },
    async seedDB() {
      const response = await fetchApi('/seed/');
      await throwIfNotOk(response);
      return response.json();
    },
    async getSong() {
      this.selectedAnswer = null;
      this.correctAnswer = null;
      this.questionPackage = null;
      this.hasCheckedAnswer = false;

      const response = await fetchApi('/game/', {});
      const responseJson = await response.json();
      this.questionPackage = responseJson;
    },
    async checkAnswer(payload: { public_id: number; secret_id: number }) {
      this.correctAnswer = null;
      this.hasCheckedAnswer = false;

      const response = await fetchApi('/game/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      await throwIfNotOk(response);
      const responseJson = await response.json();
      this.correctAnswer = responseJson;
      this.hasCheckedAnswer = true;
      return responseJson;
    },
    async submitAnswer() {
      this.correctAnswer = null;

      const secret_id = this.questionPackage?.question.secret_id;
      const public_id = this.selectedAnswer;

      const response = await fetchApi('/game/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          public_id,
          secret_id
        })
      });

      const responseJson = await response.json();
      this.correctAnswer = responseJson;
      this.hasCheckedAnswer = true;
    }
  }
});
