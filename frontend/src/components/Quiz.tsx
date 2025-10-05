import { useQuizStore } from "@/shared/store/quizStore.ts";
import { useAnswersStore } from "@/shared/store/answersStore.ts";
import { questions } from "@/shared/consts/questions.ts";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { postUserAnswers } from "@/shared/api/user/user.ts";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@/shared/config/routeConfig.tsx";
import { QuizQuestion } from "@/components/QuizQuestion";

export const Quiz = () => {
    const { currentQuestion, nextQuestion, prevQuestion } = useQuizStore();
    const navigate = useNavigate();
    const { setAnswer, getAnswer, answers, willingToSave, setWillingToSave } = useAnswersStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const question = questions[currentQuestion];

    const isAnswered = () => {
        const answer = getAnswer(currentQuestion);
        if (question.type === "input") return answer && String(answer).trim() !== "";
        if (question.type === "select") return answer !== undefined;
        if (question.type === "slider") return answer !== undefined;
        if (question.type === "slider-percent") return answer !== undefined;
        if (question.type === "input-otp") return answer && String(answer).length === 4;
        return false;
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-greenCustom to-blue-500 h-2">
                <div
                    className="bg-white h-full transition-all duration-500 ease-out"
                    style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                />
            </div>

            <div className="p-8 md:p-12">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="text-sm font-medium text-greenCustom">
                            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                        {question.label}
                    </h2>
                </div>

                <div className="mb-12">
                    <QuizQuestion
                        question={question}
                        currentAnswer={getAnswer(currentQuestion)}
                        onAnswerChange={(answer) => setAnswer(currentQuestion, answer)}
                        willingToSave={willingToSave}
                        onWillingToSaveChange={setWillingToSave}
                    />
                </div>

                <div className="flex justify-between items-center">
                    {currentQuestion > 0 ? (
                        <button
                            onClick={prevQuestion}
                            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all duration-200 font-medium"
                        >
                            <ChevronLeft size={20}/>
                            Back
                        </button>
                    ) : (
                        <div/>
                    )}

                    <button
                        onClick={async () => {
                            if (currentQuestion === questions.length - 1) {
                                setIsSubmitting(true);
                                try {
                                    await postUserAnswers(answers, willingToSave);
                                    navigate(RoutePaths.dashboard);
                                } catch (error) {
                                    console.error('Failed to submit answers:', error);
                                } finally {
                                    setIsSubmitting(false);
                                }
                            } else {
                                nextQuestion();
                            }
                        }}
                        disabled={!isAnswered() || isSubmitting}
                        className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                            isAnswered() && !isSubmitting
                                ? "bg-greenCustom hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {isSubmitting ? "Submitting..." : currentQuestion === questions.length - 1 ? "Complete" : "Next"}
                        <ChevronRight size={20}/>
                    </button>
                </div>
            </div>
        </div>
    );
};