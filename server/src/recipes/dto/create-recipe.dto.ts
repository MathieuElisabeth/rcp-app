import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RecipeType, RecipeDifficulty, RecipePrice } from '../entities/recipe.entity';

class CreateIngredientDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  quantity: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  unit?: string;
}

class CreateStepDto {
  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description: string;
}

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ enum: RecipeType })
  @IsEnum(RecipeType)
  type: RecipeType;

  @ApiProperty({ enum: RecipeDifficulty })
  @IsEnum(RecipeDifficulty)
  difficulty: RecipeDifficulty;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(480) // 8 hours max
  preparationTime: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(20)
  servings: number;

  @ApiProperty({ enum: RecipePrice })
  @IsEnum(RecipePrice)
  price: RecipePrice;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ type: [CreateIngredientDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  ingredients: CreateIngredientDto[];

  @ApiProperty({ type: [CreateStepDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStepDto)
  steps: CreateStepDto[];
}