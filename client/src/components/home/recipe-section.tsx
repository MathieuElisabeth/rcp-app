'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import api from '@/lib/api'
import { Recipe } from '@/types/recipe'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { formatTime } from '@/lib/utils'

interface RecipeSectionProps {
  title: string
  endpoint: string
}

export function RecipeSection({ title, endpoint }: RecipeSectionProps) {
  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ['recipes', endpoint],
    queryFn: async () => {
      const response = await api.get<Recipe[]>(endpoint)
      return response.data
    },
  })

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
          <div className="text-center text-gray-500">
            Erreur lors du chargement des recettes
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes?.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {recipe.image && (
                  <div className="aspect-video bg-gray-200 rounded-md mb-4">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
                <CardTitle className="text-lg">{recipe.title}</CardTitle>
                <CardDescription>
                  Par {recipe.author.username}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{formatTime(recipe.preparationTime)}</span>
                  <span>{recipe.servings} portions</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                    {recipe.difficulty}
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/recipes/${recipe.id}`}>Voir</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/recipes">Voir toutes les recettes</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}