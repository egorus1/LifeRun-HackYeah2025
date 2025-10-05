import {useQuizStore} from "@/shared/store/quizStore.ts";
import {useAnswersStore} from "@/shared/store/answersStore.ts";
import {questions} from "@/shared/consts/questions.ts";
import {RadioGroup, RadioGroupItem} from "@/shared/ui/radio-group.tsx";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/shared/ui/input-otp.tsx";
import {Slider} from "@/shared/ui/slider.tsx";
import {useEffect, useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {postUserAnswers} from "@/shared/api/user/user.ts";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "@/shared/config/routeConfig.tsx";

export const Quiz = () => {
    const {currentQuestion, nextQuestion, prevQuestion} = useQuizStore();
    const navigate = useNavigate();
    const {setAnswer, getAnswer, answers, willingToSave, setWillingToSave} = useAnswersStore();
    const [sliderValue, setSliderValue] = useState(1000);
    const [percentValue, setPercentValue] = useState(10);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const question = questions[currentQuestion];

    const isAnswered = () => {
        const answer = getAnswer(currentQuestion);
        if (question.type === "input") return answer && answer.trim() !== "";
        if (question.type === "select") return answer !== undefined;
        if (question.type === "slider") return answer !== undefined;
        if (question.type === "slider-percent") return answer !== undefined;
        if (question.type === "input-otp") return answer && answer.length === 4;
        return false;
    };

    useEffect(() => {
        const savedAnswer = getAnswer(currentQuestion);
        if (savedAnswer !== undefined && question.type === "slider") {
            setSliderValue(savedAnswer);
        }
        if (savedAnswer !== undefined && question.type === "slider-percent") {
            setPercentValue(savedAnswer);
        } else if (question.type === "slider-percent") {
            setPercentValue(willingToSave);
        }
    }, [currentQuestion, getAnswer, question.type]);

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-gradient-to-r from-greenCustom to-blue-500 h-2">
                <div
                    className="bg-white h-full transition-all duration-500 ease-out"
                    style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                />
            </div>

            <div className="p-8 md:p-12">
                {/* Header */}
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

                {/* Question Content */}
                <div className="mb-12">

                    {question.type === "input" && (
                        <div className="space-y-2 flex gap-2 items-center">
                            <label className="text-2xl font-medium text-gray-700">Your answer</label>
                            <input
                                type="number"
                                placeholder="Enter your age"
                                value={getAnswer(currentQuestion) || ""}
                                onChange={(e) => setAnswer(currentQuestion, e.target.value)}
                                className="w-full max-w-md p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-greenCustom focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                            />
                        </div>
                    )}

                    {question.type === "select" && (
                        <RadioGroup
                            className="space-y-3"
                            value={getAnswer(currentQuestion)}
                            onValueChange={(value) => setAnswer(currentQuestion, value)}
                        >
                            {["male", "female", "others", "dont-want-to-say"].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-greenCustom hover:bg-green-50 transition-all duration-200 cursor-pointer"
                                    onClick={() => setAnswer(currentQuestion, option)}
                                >
                                    <RadioGroupItem value={option} id={option} className="text-greenCustom"/>
                                    <label htmlFor={option}
                                           className="text-lg font-medium text-gray-700 cursor-pointer capitalize">
                                        {option.replace("-", " ").replace("_", " ")}
                                    </label>
                                </div>
                            ))}
                        </RadioGroup>
                    )}

                    {question.type === "slider" && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div
                                    className="inline-flex items-center gap-3 bg-greenCustom text-white px-6 py-3 rounded-2xl text-2xl font-bold">
                                    <input
                                        type="number"
                                        min="0"
                                        max="20000"
                                        step="100"
                                        value={sliderValue}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            setSliderValue(value);
                                            setAnswer(currentQuestion, value);
                                        }}
                                        className="bg-transparent text-white text-center w-24 outline-none"
                                    />
                                    <span>PLN</span>
                                </div>
                            </div>
                            <div className="px-4">
                                <Slider
                                    value={[sliderValue]}
                                    onValueChange={(value) => {
                                        setSliderValue(value[0]);
                                        setAnswer(currentQuestion, value[0]);
                                    }}
                                    min={0}
                                    max={20000}
                                    step={100}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>0 PLN</span>
                                    <span>20,000 PLN</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {question.type === "slider-percent" && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div
                                    className="inline-flex items-center gap-3 bg-greenCustom text-white px-6 py-3 rounded-2xl text-2xl font-bold">
                                    <span>{percentValue}%</span>
                                </div>
                            </div>
                            <div className="px-4">
                            <Slider
                                value={[percentValue]}
                                onValueChange={(value) => {
                                    setPercentValue(value[0]);
                                    setAnswer(currentQuestion, value[0]);
                                    setWillingToSave(value[0]);
                                }}
                                min={0}
                                max={100}
                                step={1}
                                className="w-full"
                            />
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>0%</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {question.type === "input-otp" && (
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-gray-600">Enter the 4-digit code</p>
                            <InputOTP
                                key={currentQuestion}
                                maxLength={4}
                                pattern="[0-9]*"
                                value={getAnswer(currentQuestion) || ""}
                                onChange={(value) => {
                                    const numbersOnly = value.replace(/[^0-9]/g, '');
                                    setAnswer(currentQuestion, numbersOnly);
                                }}
                                className="flex justify-center"
                            >
                                <InputOTPGroup className="gap-3 flex justify-center">
                                    <InputOTPSlot index={0}
                                                  className="w-14 h-14 text-xl border-2 border-gray-200 rounded-xl text-center"/>
                                    <InputOTPSlot index={1}
                                                  className="w-14 h-14 text-xl border-2 border-gray-200 rounded-xl text-center"/>
                                    <InputOTPSlot index={2}
                                                  className="w-14 h-14 text-xl border-2 border-gray-200 rounded-xl text-center"/>
                                    <InputOTPSlot index={3}
                                                  className="w-14 h-14 text-xl border-2 border-gray-200 rounded-xl text-center"/>
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    )}
                </div>

                {/* Navigation */}
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
                                    console.log('Answers submitted successfully');
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
}