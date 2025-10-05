import { IsNumber, IsString, IsNotEmpty, IsOptional } from "class-validator";


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  age: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNumber()
  @IsNotEmpty()
  salary: number;

  @IsString()
  @IsNotEmpty()
  workEndYear: string;

  @IsString()
  @IsNotEmpty()
  workStartYear: string;

  @IsNumber()
  @IsNotEmpty()
  willingToSave: number; 
   
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  disabilities?: string;
}

export class UserDto {
  id: string;
  name: string | null;
  gender: string;
  age: number;
  salary: number;
  yearOfStarting: number;
  plannedYearOfRetirement: number;
  willingToSave: number;
  disabilities: string | null;
  createdAt: Date;
  updatedAt: Date;
  objective?: ObjectiveDto;
}

export class CreateObjectiveDto {
  @IsString()
  @IsNotEmpty() 
  title: string;

  @IsNumber()
  @IsNotEmpty() 
  desiredMonthlyPension: number;

  @IsNumber()
  userId: string;
}

export class ObjectiveDto {
  id: string;
  title: string;
  desiredMonthlyPension: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: UserDto;
}