import { IsNotEmpty } from 'class-validator';

export class UpdateMealDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  name: string;

  imageUrl: string;

  videoUrl: string;

  @IsNotEmpty()
  instructions: string[];
}
