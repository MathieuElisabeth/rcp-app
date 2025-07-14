import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Step } from './entities/step.entity';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Step)
    private stepRepository: Repository<Step>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto, author: User): Promise<Recipe> {
    const recipe = this.recipeRepository.create({
      ...createRecipeDto,
      author,
    });

    const savedRecipe = await this.recipeRepository.save(recipe);

    // Create ingredients
    if (createRecipeDto.ingredients) {
      const ingredients = createRecipeDto.ingredients.map((ing, index) =>
        this.ingredientRepository.create({
          ...ing,
          recipe: savedRecipe,
          order: index + 1,
        }),
      );
      await this.ingredientRepository.save(ingredients);
    }

    // Create steps
    if (createRecipeDto.steps) {
      const steps = createRecipeDto.steps.map((step, index) =>
        this.stepRepository.create({
          ...step,
          stepNumber: index + 1,
          recipe: savedRecipe,
        }),
      );
      await this.stepRepository.save(steps);
    }

    return this.findOne(savedRecipe.id);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    type?: string,
    difficulty?: string,
  ): Promise<{ recipes: Recipe[]; total: number }> {
    const queryBuilder = this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients')
      .leftJoinAndSelect('recipe.steps', 'steps')
      .orderBy('recipe.createdAt', 'DESC');

    if (search) {
      queryBuilder.andWhere('recipe.title ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (type) {
      queryBuilder.andWhere('recipe.type = :type', { type });
    }

    if (difficulty) {
      queryBuilder.andWhere('recipe.difficulty = :difficulty', { difficulty });
    }

    const [recipes, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { recipes, total };
  }

  async findOne(id: string, userId?: string): Promise<Recipe> {
    const queryBuilder = this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients')
      .leftJoinAndSelect('recipe.steps', 'steps')
      .leftJoinAndSelect('recipe.comments', 'comments')
      .leftJoinAndSelect('comments.author', 'commentAuthor')
      .where('recipe.id = :id', { id })
      .orderBy('ingredients.order', 'ASC')
      .addOrderBy('steps.stepNumber', 'ASC')
      .addOrderBy('comments.createdAt', 'DESC');

    if (userId) {
      queryBuilder.leftJoinAndSelect('recipe.likedBy', 'likedBy', 'likedBy.id = :userId', { userId });
    }

    const recipe = await queryBuilder.getOne();

    if (!recipe) {
      throw new NotFoundException('Recette non trouvée');
    }

    return recipe;
  }

  async findPopular(limit: number = 8): Promise<Recipe[]> {
    return this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients')
      .leftJoinAndSelect('recipe.steps', 'steps')
      .orderBy('recipe.likesCount', 'DESC')
      .addOrderBy('recipe.createdAt', 'DESC')
      .limit(limit)
      .getMany();
  }

  async findRecent(limit: number = 8): Promise<Recipe[]> {
    return this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients')
      .leftJoinAndSelect('recipe.steps', 'steps')
      .orderBy('recipe.createdAt', 'DESC')
      .limit(limit)
      .getMany();
  }

  async findByUser(userId: string): Promise<Recipe[]> {
    return this.recipeRepository.find({
      where: { author: { id: userId } },
      relations: ['author', 'ingredients', 'steps'],
      order: { createdAt: 'DESC' },
    });
  }

  async findLikedByUser(userId: string): Promise<Recipe[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['likedRecipes', 'likedRecipes.author', 'likedRecipes.ingredients', 'likedRecipes.steps'],
    });

    return user?.likedRecipes || [];
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto, userId: string): Promise<Recipe> {
    const recipe = await this.findOne(id);

    if (recipe.author.id !== userId) {
      throw new ForbiddenException('Vous ne pouvez modifier que vos propres recettes');
    }

    // Update basic recipe info
    await this.recipeRepository.update(id, {
      title: updateRecipeDto.title,
      description: updateRecipeDto.description,
      type: updateRecipeDto.type,
      difficulty: updateRecipeDto.difficulty,
      preparationTime: updateRecipeDto.preparationTime,
      servings: updateRecipeDto.servings,
      price: updateRecipeDto.price,
      image: updateRecipeDto.image,
    });

    // Update ingredients
    if (updateRecipeDto.ingredients) {
      await this.ingredientRepository.delete({ recipe: { id } });
      const ingredients = updateRecipeDto.ingredients.map((ing, index) =>
        this.ingredientRepository.create({
          ...ing,
          recipe: { id } as Recipe,
          order: index + 1,
        }),
      );
      await this.ingredientRepository.save(ingredients);
    }

    // Update steps
    if (updateRecipeDto.steps) {
      await this.stepRepository.delete({ recipe: { id } });
      const steps = updateRecipeDto.steps.map((step, index) =>
        this.stepRepository.create({
          ...step,
          stepNumber: index + 1,
          recipe: { id } as Recipe,
        }),
      );
      await this.stepRepository.save(steps);
    }

    return this.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const recipe = await this.findOne(id);

    if (recipe.author.id !== userId) {
      throw new ForbiddenException('Vous ne pouvez supprimer que vos propres recettes');
    }

    await this.recipeRepository.remove(recipe);
  }

  async toggleLike(recipeId: string, userId: string): Promise<{ isLiked: boolean; likesCount: number }> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
      relations: ['likedBy'],
    });

    if (!recipe) {
      throw new NotFoundException('Recette non trouvée');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const isLiked = recipe.likedBy.some((u) => u.id === userId);

    if (isLiked) {
      recipe.likedBy = recipe.likedBy.filter((u) => u.id !== userId);
      recipe.likesCount = Math.max(0, recipe.likesCount - 1);
    } else {
      recipe.likedBy.push(user);
      recipe.likesCount += 1;
    }

    await this.recipeRepository.save(recipe);

    return {
      isLiked: !isLiked,
      likesCount: recipe.likesCount,
    };
  }

  async addComment(recipeId: string, createCommentDto: CreateCommentDto, userId: string): Promise<Comment> {
    const recipe = await this.findOne(recipeId);
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const comment = this.commentRepository.create({
      ...createCommentDto,
      recipe,
      author: user,
    });

    return this.commentRepository.save(comment);
  }

  async removeComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['author'],
    });

    if (!comment) {
      throw new NotFoundException('Commentaire non trouvé');
    }

    if (comment.author.id !== userId) {
      throw new ForbiddenException('Vous ne pouvez supprimer que vos propres commentaires');
    }

    await this.commentRepository.remove(comment);
  }
}