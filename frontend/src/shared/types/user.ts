export type Gender = 'male' | 'female';

export interface UserData {
  age: number;
  gender: Gender;
  salary: number;
  yearOfStarting: number;
  plannedYearOfRetirement: number;
  willingToSave: number;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor?: string;
    borderWidth?: number;
  }>;
}

export interface AnalysisData {
  percentage: number | null;
  data: ChartData | null;
  userData: UserData | null;
}

export interface UserAnswers extends Record<number, string | number> {
  0: number; // age
  1: Gender; // gender
  2: number; // salary
  3: number; // workStartYear
  4: number; // workEndYear
}