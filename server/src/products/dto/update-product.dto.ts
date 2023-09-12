import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @Length(1)
  @IsString()
  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  title?: string;

  @Min(1)
  @IsInt()
  @IsOptional()
  price?: number;

  @Length(1)
  @IsString()
  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  description?: string;
}
