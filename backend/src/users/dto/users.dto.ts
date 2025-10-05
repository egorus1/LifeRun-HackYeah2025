import { IsNumber, IsString, IsNotEmpty, IsOptional } from "class-validator";


export class CreateUserDto {
  @IsString() 
  token: string;

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
  token: string;
  gender: string;
  age: number;
  salary: number;
  yearOfStarting: number;
  plannedYearOfRetirement: number;
  willingToSave: number;
  disabilities: string | null;
  createdAt: Date;
  updatedAt: Date;
}
