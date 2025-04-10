import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/profile';
import { router } from 'expo-router';

export const useCheckProfile = () => {
  useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    onSuccess: () => {
      router.replace('/');
    },
    onError: (error: any) => {
      if (error.response?.status === 404 || error.response?.status === 500) {
        router.replace('/create-profile');
      } else {
        console.error('Erreur lors de la vérification du profil:', error);
      }
    },
  });
};
