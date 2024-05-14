import { ApiResponse } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class AuthUserResponce {
  @IsString()
  firstName: string;

  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  token: string;
}
