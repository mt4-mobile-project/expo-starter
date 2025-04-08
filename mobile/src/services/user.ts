import { api } from '@/utils/api';
import { User } from '@/types/user';

export const getUsers = async (): Promise<User[]> => {
  return api.get<User[]>('/users');
};

export const getCurrentUser = async (): Promise<User> => {
  return await api.get<User>('/users/me');
};
