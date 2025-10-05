import { IsString, IsNumber, IsOptional } from 'class-validator';

// POST - Calculate (no updates)
export class CalculateDto {
  @IsString()
  token: string;

  @IsNumber()
  objective: number;
}

// PATCH - Update fields + recalculate
export class UpdateAndCalculateDto {
  @IsString()
  token: string;

  @IsNumber()
  objective: number;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsNumber()
  yearOfStarting?: number;

  @IsOptional()
  @IsNumber()
  plannedYearOfRetirement?: number;
}

export class UserDataDto {
  salary: number;
  age: number;
  yearOfStarting: number;
  plannedYearOfRetirement: number;
  willingToSave: number;
}

export class GraphDataDto {
  labels: number[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export class CalculationResponseDto {
  percentage: number;
  data: GraphDataDto;
  userData: UserDataDto;
}