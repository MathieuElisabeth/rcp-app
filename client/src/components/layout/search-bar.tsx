'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        placeholder="Rechercher des recettes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
        aria-label="Rechercher des recettes"
      />
      <Button type="submit" size="sm">
        Rechercher
      </Button>
    </form>
  )
}