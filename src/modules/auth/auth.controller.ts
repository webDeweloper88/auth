import { CreateUserDto } from '../user/dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDTO } from './dto';
import { AuthUserResponce } from './responce';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Добавление закрывающей скобки

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('API')
  @Post('login')
  async login(@Body() dto: UserLoginDTO): Promise<AuthUserResponce> {
    return this.authService.loginUser(dto);
  }
}
