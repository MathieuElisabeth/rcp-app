import { Suspense } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Hero } from '@/components/home/hero'
import { RecipeSection } from '@/components/home/recipe-section'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingSpinner />}>
          <RecipeSection 
            title="Les plus populaires" 
            endpoint="/recipes/popular" 
          />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <RecipeSection 
            title="Nouvelles recettes" 
            endpoint="/recipes/recent" 
          />
        </Suspense>
      </main>
    </div>
  )
}