import { useState, useEffect } from "react";
import { updateObjective, updateUserData } from "@/shared/api/user/user";

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

declare global {
  interface Window {
    userDataTimeout?: number;
  }
}

export const useDashboard = () => {
  const [objective, setObjective] = useState(() => {
    const saved = localStorage.getItem('objective');
    return saved ? Number(saved) : 1000;
  });

  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    percentage: null,
    data: null,
    userData: null
  });

  const handleUserDataChange = (field: keyof UserData, value: string | number) => {
    if (!analysisData.userData) return;

    const newUserData = { ...analysisData.userData, [field]: value };
    setAnalysisData(prev => ({ ...prev, userData: newUserData }));
    
    clearTimeout(window.userDataTimeout);
    window.userDataTimeout = setTimeout(async () => {
      try {
        await updateUserData(newUserData);
        if (field === 'salary' || field === 'yearOfStarting' || field === 'plannedYearOfRetirement') {
          const data = await updateObjective(objective);
          setAnalysisData(prev => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);
  };

  useEffect(() => {
    localStorage.setItem('objective', objective.toString());

    const timeoutId = setTimeout(async () => {
      try {
        const data = await updateObjective(objective);
        setAnalysisData(data);
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [objective]);

  return {
    objective,
    setObjective,
    analysisData,
    handleUserDataChange
  };
};