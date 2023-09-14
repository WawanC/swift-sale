import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  username: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  password: string;
}
