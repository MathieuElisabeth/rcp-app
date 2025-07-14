import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ingredient } from './ingredient.entity';
import { Step } from './step.entity';
import { Comment } from './comment.entity';

export enum RecipeType {
  ENTREE = 'entrée',
  PLAT = 'plat',
  DESSERT = 'dessert',
}

export enum RecipeDifficulty {
  FACILE = 'facile',
  MOYEN = 'moyen',
  DIFFICILE = 'difficile',
}

export enum RecipePrice {
  BON_MARCHE = 'bon marché',
  PRIX_MOYEN = 'prix moyen',
  COUTEUX = 'coûteux',
}

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: RecipeType,
    default: RecipeType.PLAT,
  })
  type: RecipeType;

  @Column({
    type: 'enum',
    enum: RecipeDifficulty,
    default: RecipeDifficulty.MOYEN,
  })
  difficulty: RecipeDifficulty;

  @Column()
  preparationTime: number; // in minutes

  @Column()
  servings: number;

  @Column({
    type: 'enum',
    enum: RecipePrice,
    default: RecipePrice.PRIX_MOYEN,
  })
  price: RecipePrice;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.recipes, { eager: true })
  author: User;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: true,
    eager: true,
  })
  ingredients: Ingredient[];

  @OneToMany(() => Step, (step) => step.recipe, {
    cascade: true,
    eager: true,
  })
  steps: Step[];

  @OneToMany(() => Comment, (comment) => comment.recipe)
  comments: Comment[];

  @ManyToMany(() => User, (user) => user.likedRecipes)
  likedBy: User[];

  @Column({ default: 0 })
  likesCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}