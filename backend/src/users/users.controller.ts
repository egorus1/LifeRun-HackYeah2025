import {
    Body,
    Post
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('create-user') 
        createUser(@Body() createUserDto: CreateUserDto) {
            return this.usersService.createUser(createUserDto);
        }
    }

