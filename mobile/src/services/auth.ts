import { LoginCredentials, LoginResponse } from '@/types/login';
import { api } from '@/utils/api';
import { asyncStorageToken } from '@/utils/asyncStorageToken';

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);

  if (response.token) {
    await asyncStorageToken.set(response.token);
  }

  return response;
};
