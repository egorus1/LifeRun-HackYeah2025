import {create} from "zustand";
import {questions} from "@/shared/consts/questions.ts";

interface QuizState {
    currentQuestion: number;
    nextQuestion: () => void;
    prevQuestion: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    currentQuestion: 0,

    nextQuestion: () =>
        set((state) => ({
            currentQuestion: Math.min(state.currentQuestion + 1, questions.length),
        })),

    prevQuestion: () =>
        set((state) => ({
            currentQuestion: Math.max(state.currentQuestion - 1, 0),
        })),
}));
