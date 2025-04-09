import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/auth';
import { LoginCredentials, LoginResponse } from '@/types/login';

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (data: LoginCredentials) => login(data),
    onSuccess: (response: LoginResponse) => {
      console.log('Login successful:', response);
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
