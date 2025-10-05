import { IsString, IsNumber } from 'class-validator';

export class CreateObjectiveDto {
  @IsString()
  token: string;

  @IsNumber()
  objective: number; // Desired monthly pension after retirement
}

export class UserDataDto {
  salary: number;                    // Monthly salary
  age: number;                       // Current age
  yearOfStarting: number;            // Year started working
  plannedYearOfRetirement: number; 
  willingToSave: number;  // Year planning to retire
}


export class GraphDataDto {
  labels: number[];  // Years array [2025, 2026, 2027, ...]
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export class CalculationResponseDto {
  percentage: number;  // Required savings percentage
  data: GraphDataDto;  // Chart.js configuration
}