import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/auth';
import { LoginCredentials, LoginResponse } from '@/types/login';
import { asyncStorageToken } from '@/utils/asyncStorageToken';
import { router } from 'expo-router';

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (data: LoginCredentials) => login(data),
    onSuccess: async (response: LoginResponse) => {
      if (response.token) {
        await asyncStorageToken.set(response.token);
        router.replace('/(tabs)'); // Redirection vers la page d'accueil après login
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};