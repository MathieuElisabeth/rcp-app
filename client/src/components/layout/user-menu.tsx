'use client'

import { useState } from 'react'
import Link from 'next/link'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { User } from '@/types/user'
import { Button } from '@/components/ui/button'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          aria-label="Menu utilisateur"
        >
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] bg-white rounded-md p-1 shadow-lg border border-gray-200 z-50"
          sideOffset={5}
          align="end"
        >
          <div className="px-3 py-2 text-sm">
            <p className="font-medium">{user.username}</p>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
          
          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
          
          <DropdownMenu.Item asChild>
            <Link
              href="/profile"
              className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer outline-none focus:bg-gray-100"
            >
              Mon profil
            </Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Item asChild>
            <Link
              href="/my-recipes"
              className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer outline-none focus:bg-gray-100"
            >
              Mes recettes
            </Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Item asChild>
            <Link
              href="/favorites"
              className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer outline-none focus:bg-gray-100"
            >
              Favoris
            </Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
          
          <DropdownMenu.Item
            className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer outline-none focus:bg-gray-100 text-red-600"
            onClick={logout}
          >
            Déconnexion
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}