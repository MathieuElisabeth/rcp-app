import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'
import { AuthLayout } from '@/components/auth/auth-layout'

export const metadata: Metadata = {
  title: 'Connexion - LaRecette',
  description: 'Connectez-vous à votre compte LaRecette',
}

export default function LoginPage() {
  return (
    <AuthLayout
      title="Connexion"
      subtitle="Connectez-vous à votre compte"
      linkText="Pas encore de compte ? Inscrivez-vous"
      linkHref="/register"
    >
      <LoginForm />
    </AuthLayout>
  )
}