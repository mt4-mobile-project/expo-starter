import { api } from '@/utils/api';
import { User } from '@/types/user';

export const getCurrentUser = async (): Promise<User> => {
  return await api.get<User>('/users/me');
};
