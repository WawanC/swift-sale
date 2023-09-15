import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateCartDto {
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  count: number;
}
