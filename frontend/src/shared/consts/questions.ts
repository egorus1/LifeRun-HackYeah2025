export type Question = {
    id: number;
    label: string;
    type: "input" | "select" | "slider" | "input-otp";
};

export const questions: Question[] = [
    {id: 1, label: "What is your age", type: "input"},
    {id: 2, label: "What is your gender", type: "select"},
    {id: 3, label: "Gross salary amount", type: "slider"},
    {id: 4, label: "Year of starting work", type: "input-otp"},
    {
        id: 5,
        label: "Planned year of ending professional activity (default — year of reaching retirement age)",
        type: "input-otp",
    },
];