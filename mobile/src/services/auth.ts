import { LoginCredentials, LoginResponse } from '@/types/login';
import { api } from '@/utils/api';

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  return await api.post<LoginResponse>('/auth/login', credentials);
};
