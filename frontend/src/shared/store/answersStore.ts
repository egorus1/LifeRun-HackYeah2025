import { create } from "zustand";

interface AnswersState {
  answers: Record<number, string | number>;
  willingToSave: number;
  setAnswer: (questionIndex: number, answer: string | number) => void;
  getAnswer: (questionIndex: number) => string | number | undefined;
  setWillingToSave: (value: number) => void;
}

export const useAnswersStore = create<AnswersState & { clearAnswers: () => void }>((set, get) => ({
  answers: {},
  willingToSave: 10,
  
  setAnswer: (questionIndex: number, answer: string | number) =>
    set((state) => ({
      answers: { ...state.answers, [questionIndex]: answer }
    })),
  
  getAnswer: (questionIndex: number) => get().answers[questionIndex],
  
  setWillingToSave: (value: number) => set({ willingToSave: value }),
  
  clearAnswers: () => set({ answers: {}, willingToSave: 10 })
}));