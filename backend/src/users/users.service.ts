import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path as needed
import type {CreateUserDto, UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(CreateUserDto: CreateUserDto): Promise<UserDto> {
        const userData = {
      token: CreateUserDto.token,
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

}