import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group.tsx";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp.tsx";
import { Slider } from "@/shared/ui/slider.tsx";
import { useState, useEffect } from "react";

interface Question {
  id: number;
  label: string;
  type: "input" | "select" | "slider" | "input-otp" | "slider-percent";
}

interface QuizQuestionProps {
  question: Question;
  currentAnswer: string | number | undefined;
  onAnswerChange: (answer: string | number) => void;
  willingToSave: number;
  onWillingToSaveChange: (value: number) => void;
}

export const QuizQuestion = ({ 
  question, 
  currentAnswer, 
  onAnswerChange, 
  willingToSave, 
  onWillingToSaveChange 
}: QuizQuestionProps) => {
  const [sliderValue, setSliderValue] = useState(1000);
  const [percentValue, setPercentValue] = useState(10);

  useEffect(() => {
    if (currentAnswer !== undefined && question.type === "slider") {
      setSliderValue(Number(currentAnswer));
    }
    if (currentAnswer !== undefined && question.type === "slider-percent") {
      setPercentValue(Number(currentAnswer));
    } else if (question.type === "slider-percent") {
      setPercentValue(willingToSave);
    }
  }, [currentAnswer, question.type, willingToSave]);

  if (question.type === "input") {
    return (
      <div className="space-y-2 flex gap-2 items-center">
        <label className="text-2xl font-medium text-gray-700">Your answer</label>
        <input
          type="number"
          placeholder="Enter your age"
          value={currentAnswer || ""}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="w-full max-w-md p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-greenCustom focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
        />
      </div>
    );
  }

  if (question.type === "select") {
    return (
      <RadioGroup
        className="space-y-3"
        value={currentAnswer as string}
        onValueChange={onAnswerChange}
      >
        {["male", "female", "others", "dont-want-to-say"].map((option) => (
          <div
            key={option}
            className="flex items-center space-x-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-greenCustom hover:bg-green-50 transition-all duration-200 cursor-pointer"
            onClick={() => onAnswerChange(option)}
          >
            <RadioGroupItem value={option} id={option} className="text-greenCustom"/>
            <label htmlFor={option} className="text-lg font-medium text-gray-700 cursor-pointer capitalize">
              {option.replace("-", " ").replace("_", " ")}
            </label>
          </div>
        ))}
      </RadioGroup>
    );
  }

  if (question.type === "slider") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-greenCustom text-white px-6 py-3 rounded-2xl text-2xl font-bold">
            <input
              type="number"
              min="0"
              max="20000"
              step="100"
              value={sliderValue}
              onChange={(e) => {
                const value = Number(e.target.value);
                setSliderValue(value);
                onAnswerChange(value);
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
              onAnswerChange(value[0]);
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
    );
  }

  if (question.type === "slider-percent") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-greenCustom text-white px-6 py-3 rounded-2xl text-2xl font-bold">
            <span>{percentValue}%</span>
          </div>
        </div>
        <div className="px-4">
          <Slider
            value={[percentValue]}
            onValueChange={(value) => {
              setPercentValue(value[0]);
              onAnswerChange(value[0]);
              onWillingToSaveChange(value[0]);
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
    );
  }

  if (question.type === "input-otp") {
    return (
      <div className="flex flex-col items-center space-y-4">
        <p className="text-gray-600">Enter the 4-digit code</p>
        <InputOTP
          maxLength={4}
          pattern="[0-9]*"
          value={currentAnswer as string || ""}
          onChange={(value) => {
            const numbersOnly = value.replace(/[^0-9]/g, '');
            onAnswerChange(numbersOnly);
          }}
          className="flex justify-center"
        >
          <InputOTPGroup className="gap-3 flex justify-center">
            <InputOTPSlot index={0} className="w-14 h-14 text-xl border-2 border-gray-200 rounded-xl text-center"/>
            <InputOTPSlot index={1} className="w-14 h-14 text-xl border-2 border-gray-200 rounded-xl text-center"/>
            <InputOTPSlot index={2} className="w-14 h-14 text-xl border-2 border-gray-200 rounded-xl text-center"/>
            <InputOTPSlot index={3} className="w-14 h-14 text-xl border-2 border-gray-200 rounded-xl text-center"/>
          </InputOTPGroup>
        </InputOTP>
      </div>
    );
  }

  return null;
};