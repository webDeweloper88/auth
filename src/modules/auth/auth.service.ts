import { TokenService } from './../token/token.service';
import { CreateUserDto } from '../user/dto';
import { UserService } from './../user/user.service';
import { Injectable, BadRequestException } from '@nestjs/common'; // Импорт BadRequestException
import { UserLoginDTO } from './dto';
import { AppError } from 'src/common/constants/errors';
import * as bcrypt from 'bcrypt';
import { AuthUserResponce } from './responce';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findByEmail(dto.email); // Исправление findBayEmail на findByEmail
    if (existUser)
      throw new BadRequestException('User with this email already exists.');

    return this.userService.createUser(dto);
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponce> {
    const existUser = await this.userService.findByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    const token = await this.tokenService.generateJwtToken(dto.email);

    return { ...existUser, token };
  }
}
