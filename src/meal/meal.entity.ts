import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
