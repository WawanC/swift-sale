import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CartProductParamDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;
}
