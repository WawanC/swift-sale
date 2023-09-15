import { IsInt, IsOptional, Min } from 'class-validator';

export class DeleteCartDto {
  @Min(1)
  @IsInt()
  @IsOptional()
  count?: number;
}
