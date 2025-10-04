// ============================================
// USER DTOs
// ============================================

export class CreateUserDto {
  name?: string;
  sex: string;
  age: number;
  salary: number;
  yearOfStarting: number;
  plannedYearOfRetirement: number;
}

export class UpdateUserDto {
  name?: string;
  sex?: string;
  age?: number;
  salary?: number;
  yearOfStarting?: number;
  plannedYearOfRetirement?: number;
}

export class UserDto {
  id: string;
  name: string | null;
  sex: string;
  age: number;
  salary: number;
  yearOfStarting: number;
  plannedYearOfRetirement: number;
  createdAt: Date;
  updatedAt: Date;
  objective?: ObjectiveDto;
}

// ============================================
// OBJECTIVE DTOs
// ============================================

export class CreateObjectiveDto {
  title: string;
  desiredMonthlyPension: number;
  userId: string;
}

export class UpdateObjectiveDto {
  title?: string;
  desiredMonthlyPension?: number;
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