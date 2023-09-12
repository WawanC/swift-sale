import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(1)
  @Transform(({ value }) => value.trim())
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsString()
  @Length(1)
  @Transform(({ value }) => value.trim())
  description: string;
}
