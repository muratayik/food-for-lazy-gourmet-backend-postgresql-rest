import { IsNotEmpty } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  mealId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  amount: string;
}
