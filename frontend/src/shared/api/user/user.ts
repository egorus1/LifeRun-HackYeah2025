import { baseInstance } from "@/shared/api/instance.ts";
import { createToken, getToken } from "@/shared/lib/token.ts";

type Gender = 'male' | 'female';

interface UserData {
  age: number;
  gender: Gender;
  salary: number;
  yearOfStarting: number;
  plannedYearOfRetirement: number;
  willingToSave: number;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor?: string;
    borderWidth?: number;
  }>;
}

interface AnalysisData {
  percentage: number | null;
  data: ChartData | null;
  userData: UserData | null;
}

type UserAnswers = Record<number, string | number>;

export const postUserAnswers = async (answers: UserAnswers, willingToSave: number) => {
    const formattedData = {
        token: createToken(),
        age: Number(answers[0]),
        gender: answers[1],
        salary: answers[2],
        workStartYear: Number(answers[3]),
        workEndYear: Number(answers[4]),
        willingToSave: willingToSave
    };

    return (
        await baseInstance.post("users/create-user", formattedData)
    ).data;
};

export const updateObjective = async (objective: number): Promise<AnalysisData> => {
    return (
        await baseInstance.post("analysis/calculate", {
            token: getToken(),
            objective
        })
    ).data;
};

export const updateUserData = async (userData: UserData) => {
    return (
        await baseInstance.patch("analysis/update-user", {
            token: getToken(),
            ...userData
        })
    ).data;
};
