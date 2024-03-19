// import { QuestionPackage, Choice, CorrectAnswer } from './types.ts';
import { fetchApi } from './fetch';

import { defineStore } from 'pinia';
export interface CorrectAnswer {
  origin_game: string;
  remix_artist: string;
  ocremix_remix_url: string;
  original_song_title: string;
}

export interface Choice {
  origin_game: string;
  public_id: number;
}

export interface Question {
  remix_youtube_url: string;
  secret_id: number;
}

export interface QuestionPackage {
  choices: Choice[];
  question: Question;
}

// In which I question whether typescript is really worth the headache
function getYoutubeIdFromUrl(url: string) {
  const blah = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return blah[2] !== undefined ? blah[2].split(/[^0-9a-z_\-]/i)[0] : blah[0];
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
    async getSong() {
      this.selectedAnswer = null;
      this.correctAnswer = null;
      this.questionPackage = null;
      this.hasCheckedAnswer = false;

      const response = await fetchApi('/game/', {});
      const responseJson = await response.json();
      this.questionPackage = responseJson;
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
