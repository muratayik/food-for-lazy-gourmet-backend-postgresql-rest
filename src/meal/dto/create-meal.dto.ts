import { IsNotEmpty } from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  name: string;

  imageUrl: string;

  videoUrl: string;

  @IsNotEmpty()
  instructions: string[];
}
