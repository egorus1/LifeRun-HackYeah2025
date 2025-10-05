import { create } from "zustand";

interface AnswersState {
  answers: Record<number, any>;
  willingToSave: number;
  setAnswer: (questionIndex: number, answer: any) => void;
  getAnswer: (questionIndex: number) => any;
  setWillingToSave: (value: number) => void;
  clearAnswers: () => void;
}

export const useAnswersStore = create<AnswersState>((set, get) => ({
  answers: {},
  willingToSave: 10,
  
  setAnswer: (questionIndex: number, answer: any) =>
    set((state) => ({
      answers: { ...state.answers, [questionIndex]: answer }
    })),
  
  getAnswer: (questionIndex: number) => get().answers[questionIndex],
  
  setWillingToSave: (value: number) => set({ willingToSave: value }),
  
  clearAnswers: () => set({ answers: {}, willingToSave: 10 })
}));