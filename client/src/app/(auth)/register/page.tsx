import { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/register-form'
import { AuthLayout } from '@/components/auth/auth-layout'

export const metadata: Metadata = {
  title: 'Inscription - LaRecette',
  description: 'Créez votre compte LaRecette',
}

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Inscription"
      subtitle="Créez votre compte LaRecette"
      linkText="Déjà un compte ? Connectez-vous"
      linkHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  )
}