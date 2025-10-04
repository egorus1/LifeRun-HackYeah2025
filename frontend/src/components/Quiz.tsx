import {useQuizStore} from "@/shared/store/quizStore.ts";
import {questions} from "@/shared/consts/questions.ts";
import {RadioGroup, RadioGroupItem} from "@/shared/ui/radio-group.tsx";

export const Quiz = () => {
    const {currentQuestion, nextQuestion, prevQuestion} = useQuizStore();

    const question = questions[currentQuestion];

    return (
        <div className="min-w-[40%] w-full max-w-2xl">
            <div>
                <div className="bg-[#3F416E54] py-[14px] px-2  rounded-3xl min-w-[40%] inline-block">
                    <div className="text-lg font-semibold">Question:</div>
                    <div className="mt-2">{question.label}</div>
                </div>
            </div>

            {question.type === "input" && (
                <input
                    type="number"
                    placeholder="Enter your age"
                    className="border-2 border-gray-300 p-3 rounded-lg mt-4 block w-64 focus:border-greenCustom focus:outline-none transition-colors"
                />
            )}

            {question.type === "select" && (
                <RadioGroup className="mt-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="others" id="others" />
                        <label htmlFor="others">Others</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dont-want-to-say" id="dont-want-to-say" />
                        <label htmlFor="dont-want-to-say">Don't want to say</label>
                    </div>
                </RadioGroup>
            )}

            <div className="flex justify-between mt-5 w-full">
                {currentQuestion > 0 ? (
                    <button onClick={prevQuestion} className="bg-orange-500 text-white px-4 py-2 rounded-2xl">Back</button>
                ) : (
                    <div></div>
                )}

                {currentQuestion < questions.length - 1 ? (
                    <button onClick={nextQuestion} className="bg-greenCustom text-white px-4 py-2 rounded-2xl">
                        Next
                    </button>
                ) : (
                    <button className="bg-greenCustom text-white px-4 py-2 rounded-2xl">Submit</button>
                )}
            </div>
        </div>
    );
}