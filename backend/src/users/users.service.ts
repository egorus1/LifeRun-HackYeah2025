import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path as needed
import type { CreateUserDto, UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
        return this.prisma.user.create({
            data: createUserDto,
        });
    }
}