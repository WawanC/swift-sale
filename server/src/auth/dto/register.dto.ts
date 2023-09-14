import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  email: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  username: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  password: string;
}
