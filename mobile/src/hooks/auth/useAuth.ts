import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/auth';
import { LoginCredentials, LoginResponse } from '@/types/login';
import { asyncStorageToken } from '@/utils/asyncStorageToken';
import { router } from 'expo-router';
import { getProfile } from '@/services/profile';

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (data: LoginCredentials) => login(data),
    onSuccess: async (response: LoginResponse) => {
      if (response.token) {
        console.log(response.token, 'kkkkkkkkkkkkk');
        await asyncStorageToken.set(response.token);
        try {
          console.log('Vérification du profil...');
          await getProfile();
          router.replace('/(tabs)');
        } catch (error: any) {
          console.error('Erreur lors de la vérification du profil:', error);
          router.replace('/create-profile');
        }
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
