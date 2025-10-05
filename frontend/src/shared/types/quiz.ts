export type QuestionType = "input" | "select" | "slider" | "input-otp" | "slider-percent";

export interface Question {
  id: number;
  label: string;
  type: QuestionType;
}

export interface QuizState {
  currentQuestion: number;
  nextQuestion: () => void;
  prevQuestion: () => void;
}

export interface AnswersState {
  answers: Record<number, string | number>;
  willingToSave: number;
  setAnswer: (questionId: number, answer: string | number) => void;
  getAnswer: (questionId: number) => string | number | undefined;
  setWillingToSave: (value: number) => void;
}