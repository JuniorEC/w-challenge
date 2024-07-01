import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('cep')
  async getCep(@Query('cep') cep: string) {
    return this.userService.findCep(cep);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('page') page = 1, @Query('size') size = 10) {
    const users = await this.userService.findAll(page, size);
    const totalCount = await this.userService.countUsers();

    return {
      users,
      totalCount,
    };
  }
}
