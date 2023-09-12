import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductParamDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
