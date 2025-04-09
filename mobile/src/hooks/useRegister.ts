import { useMutation } from '@tanstack/react-query';
import { register } from '@/services/auth';
import { RegisterCredentials } from '@/types/register';
import { router } from 'expo-router';

export const useRegister = () => {
  const registerMutation = useMutation({
    mutationFn: (data: RegisterCredentials) => register(data),
    onSuccess: () => {
    router.replace('/auth/login'); 
    console.log('Registration successful');
    },
    onError: (error: any) => {
      console.error('Registration failed:', error);
    },
  });

  return {
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
  };
};