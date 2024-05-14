import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class UserLoginDTO {
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
