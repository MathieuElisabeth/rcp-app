import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import api from '@/lib/api'
import { User } from '@/types/user'
import { toast } from '@/hooks/use-toast'

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  username: string
  email: string
  password: string
}

interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData): Promise<AuthResponse> => {
      const response = await api.post('/auth/login', data)
      return response.data
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast({
        title: 'Connexion réussie',
        description: `Bienvenue ${data.user.username}!`,
      })
      router.push('/')
    },
    onError: (error: any) => {
      toast({
        title: 'Erreur de connexion',
        description: error.response?.data?.message || 'Une erreur est survenue',
        variant: 'destructive',
      })
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData): Promise<AuthResponse> => {
      const response = await api.post('/auth/register', data)
      return response.data
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast({
        title: 'Inscription réussie',
        description: `Bienvenue ${data.user.username}!`,
      })
      router.push('/')
    },
    onError: (error: any) => {
      toast({
        title: 'Erreur d\'inscription',
        description: error.response?.data?.message || 'Une erreur est survenue',
        variant: 'destructive',
      })
    },
  })

  const logout = () => {
    clearAuth()
    queryClient.clear()
    toast({
      title: 'Déconnexion',
      description: 'Vous avez été déconnecté avec succès',
    })
    router.push('/')
  }

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  }
}