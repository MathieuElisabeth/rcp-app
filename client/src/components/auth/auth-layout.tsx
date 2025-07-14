import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  linkText: string
  linkHref: string
}

export function AuthLayout({ children, title, subtitle, linkText, linkHref }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-primary">
            LaRecette
          </Link>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{title}</CardTitle>
            <CardDescription className="text-center">
              {subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {children}
            <div className="mt-6 text-center">
              <Link 
                href={linkHref}
                className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline"
              >
                {linkText}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}