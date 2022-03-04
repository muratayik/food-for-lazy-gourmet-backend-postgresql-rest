import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryId: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  videoUrl: string;

  @Column('text', { array: true })
  instructions: string[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_) => Ingredient, (ingredient) => ingredient.meal, {
    eager: true,
  })
  ingredients: Ingredient[];
}
