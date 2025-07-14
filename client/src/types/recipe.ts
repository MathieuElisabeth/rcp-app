export interface Recipe {
  id: string
  title: string
  description?: string
  type: 'entrée' | 'plat' | 'dessert'
  difficulty: 'facile' | 'moyen' | 'difficile'
  preparationTime: number
  servings: number
  price: 'bon marché' | 'prix moyen' | 'coûteux'
  ingredients: Ingredient[]
  steps: Step[]
  image?: string
  author: {
    id: string
    username: string
  }
  likes: number
  isLiked?: boolean
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

export interface Ingredient {
  id: string
  name: string
  quantity: string
  unit?: string
}

export interface Step {
  id: string
  stepNumber: number
  description: string
}

export interface Comment {
  id: string
  text: string
  author: {
    id: string
    username: string
  }
  createdAt: string
}