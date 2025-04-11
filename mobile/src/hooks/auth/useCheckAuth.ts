import { useEffect } from 'react';
import { router, usePathname } from 'expo-router';
import { asyncStorageToken } from '@/utils/asyncStorageToken';

export const useCheckAuth = () => {
  const pathname = usePathname();
  const isAuthPage = pathname.includes('/auth/');

  useEffect(() => {
    const checkAuth = async () => {
      const token = await asyncStorageToken.get();

      if (!token && !isAuthPage) {
        router.replace('/auth/login');
      } else if (token && isAuthPage) {
        router.replace('/(tabs)');
      }
    };

    checkAuth();
  }, [isAuthPage]);
};
