import { create } from "zustand";

interface AnswersState {
  answers: Record<number, any>;
  setAnswer: (questionIndex: number, answer: any) => void;
  getAnswer: (questionIndex: number) => any;
  clearAnswers: () => void;
}

export const useAnswersStore = create<AnswersState>((set, get) => ({
  answers: {},
  
  setAnswer: (questionIndex: number, answer: any) =>
    set((state) => ({
      answers: { ...state.answers, [questionIndex]: answer }
    })),
  
  getAnswer: (questionIndex: number) => get().answers[questionIndex],
  
  clearAnswers: () => set({ answers: {} })
}));