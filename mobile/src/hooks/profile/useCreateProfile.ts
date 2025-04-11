import { useMutation } from '@tanstack/react-query';
import { createProfile } from '@/services/profile';
import { CreateProfileData } from '@/types/profile';
import { router } from 'expo-router';

export const useCreateProfile = () => {
  const createProfileMutation = useMutation({
    mutationFn: (data: CreateProfileData) => createProfile(data),
    onSuccess: (data) => {
      console.log('Profile created successfully:', data);
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      console.error('Profile creation failed:', error);
    },
  });

  return {
    createProfile: createProfileMutation.mutate,
    isLoading: createProfileMutation.isPending,
    error: createProfileMutation.error,
  };
};
