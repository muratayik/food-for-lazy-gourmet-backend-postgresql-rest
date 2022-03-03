import { IsNotEmpty } from 'class-validator';

export class UpdateIngredientDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  amount: string;
}
