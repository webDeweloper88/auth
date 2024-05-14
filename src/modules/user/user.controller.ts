import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  createUser(@Body() dto: CreateUserDto) {
    console.log(dto);
    return this.userService.createUser(dto);
  }
}
