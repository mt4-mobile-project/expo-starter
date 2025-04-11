import { asyncStorageToken } from '@/utils/asyncStorageToken';
import { router } from 'expo-router';

export const useLogout = () => {
  const logout = async () => {
    try {
      await asyncStorageToken.remove();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return { logout };
};
