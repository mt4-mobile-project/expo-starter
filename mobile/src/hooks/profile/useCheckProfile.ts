import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/profile';
import { router } from 'expo-router';

export const useCheckProfile = () => {
  const query = useQuery<ProfileResponse>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  if (query.isSuccess) {
    router.replace('/(tabs)');
  }

  if (query.isError) {
    const error = query.error as any;
    if (error.response?.status === 404 || error.response?.status === 500) {
      router.replace('/create-profile');
    } else {
      console.error('Erreur lors de la vérification du profil:', error);
    }
  }

  return query;
};
