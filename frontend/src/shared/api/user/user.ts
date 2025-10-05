import {baseInstance} from "@/shared/api/instance.ts";
import {createToken, getToken} from "@/shared/lib/token.ts";

export const postUserAnswers = async (answers: Record<number, string | number>, willingToSave: number) => {
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

export const updateObjective = async (objective: number) => {
    return (
        await baseInstance.post("analysis/calculate", {
            token: getToken(),
            objective
        })
    ).data;
};

export const updateUserData = async (userData: any) => {
    return (
        await baseInstance.patch("analysis/update-user", {
            token: getToken(),
            ...userData
        })
    ).data;
};
