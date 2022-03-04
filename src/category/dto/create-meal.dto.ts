import { IsNotEmpty } from 'class-validator';
import { Ingredient } from 'src/ingredient/ingredient.entity';

export class CreateMealDto {
  @IsNotEmpty()
  name: string;

  imageUrl: string;

  videoUrl: string;

  @IsNotEmpty()
  instructions: string[];

  @IsNotEmpty()
  ingredients: Ingredient[];
}
