import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @Length(1)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  title: string;

  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  price: number;

  @Length(1)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  description: string;
}
