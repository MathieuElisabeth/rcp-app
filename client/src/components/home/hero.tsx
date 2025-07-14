import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Partagez vos recettes
          <span className="text-primary block">avec le monde</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Découvrez, créez et partagez des recettes délicieuses avec notre communauté 
          de passionnés de cuisine.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/recipes">Découvrir les recettes</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">Rejoindre la communauté</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}