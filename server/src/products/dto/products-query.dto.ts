import { IsOptional, IsString, Length } from 'class-validator';

export class ProductsQueryDto {
  @Length(1)
  @IsString()
  @IsOptional()
  search?: string;
}
