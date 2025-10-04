import {create} from "zustand";

interface QuizState {
    currentQuestion: number;
    nextQuestion: () => void;
    prevQuestion: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    currentQuestion: 0,

    nextQuestion: () =>
        set((state) => ({
            currentQuestion: Math.min(state.currentQuestion + 1, 2),
        })),

    prevQuestion: () =>
        set((state) => ({
            currentQuestion: Math.max(state.currentQuestion - 1, 0),
        })),
}));
