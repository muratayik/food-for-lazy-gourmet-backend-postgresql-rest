import { Meal } from 'src/meal/meal.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  amount: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_) => Meal, (meal) => meal.ingredients, { eager: false })
  meal: Meal;
}
