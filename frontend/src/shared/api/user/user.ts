import {baseInstance} from "@/shared/api/instance.ts";

export const postUserAnswers = async (answers: Record<number, string | number>, willingToSave: number) => {
    const formattedData = {
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