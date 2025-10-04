import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path as needed
import type { CreateObjectiveDto, CreateUserDto, ObjectiveDto, UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(CreateUserDto: CreateUserDto): Promise<UserDto> {
        return this.prisma.user.create({
            data: CreateUserDto,
        });
    }

    async createObjective(CreateObjectiveDto: CreateObjectiveDto): Promise<ObjectiveDto>{
        return this.prisma.objective.create({
            data: CreateObjectiveDto,
        })
    }

}