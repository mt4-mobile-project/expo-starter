import { api } from '@/utils/api';
import { User } from '@/types/user';
export const getUsers = async (searchTerm: string = ''): Promise<User[]> => {
  const url = searchTerm ? `/users/username/${searchTerm}` : '/users';
  console.log('Request URL:', url);

  const response = await api.get(url);
  console.log('API response:', response);

  if (Array.isArray(response)) {
    return response as User[];
  }

  return [response as User];
};



export const getCurrentUser = async (): Promise<User> => {
  return await api.get<User>('/users/me');
};
  