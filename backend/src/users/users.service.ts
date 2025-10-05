import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path as needed
import type { CreateObjectiveDto, CreateUserDto, ObjectiveDto, UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(CreateUserDto: CreateUserDto): Promise<UserDto> {
        const userData = {
      age: parseInt(CreateUserDto.age),
      gender: CreateUserDto.gender,
      salary: CreateUserDto.salary,
      yearOfStarting: parseInt(CreateUserDto.workStartYear),
      plannedYearOfRetirement: parseInt(CreateUserDto.workEndYear),
      willingToSave: CreateUserDto.willingToSave,
      name: CreateUserDto.name || null,
      disabilities: CreateUserDto.disabilities || null,
    };

    return this.prisma.user.create({
      data: userData,
    });
    }

    async createObjective(CreateObjectiveDto: CreateObjectiveDto): Promise<ObjectiveDto>{
        return this.prisma.objective.create({
            data: CreateObjectiveDto,
        })
    }

}