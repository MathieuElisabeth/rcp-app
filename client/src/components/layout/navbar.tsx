'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { UserMenu } from './user-menu'
import { SearchBar } from './search-bar'

export function Navbar() {
  const { user, isAuthenticated } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">LaRecette</span>
          </Link>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/recipes/create">Nouvelle recette</Link>
              </Button>
              <UserMenu user={user!} />
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost">
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Inscription</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}