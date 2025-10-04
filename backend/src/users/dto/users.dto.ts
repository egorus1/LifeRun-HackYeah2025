import { IsNumber, IsString, IsNotEmpty } from "class-validator";


export class CreateUserDto {
  @IsString()
  name?: string;

  @IsString()
  @IsNotEmpty()
  sex: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNumber()
  @IsNotEmpty()
  salary: number;

  @IsNumber()
  @IsNotEmpty()
  yearOfStarting: number;

  @IsNumber()
  @IsNotEmpty()
  plannedYearOfRetirement: number;

  @IsString()
  @IsNotEmpty()
  disabilities: string;
}



export class UserDto {
  id: string;
  name: string | null;
  sex: string;
  age: number;
  salary: number;
  yearOfStarting: number;
  plannedYearOfRetirement: number;
  disabilities: string;
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