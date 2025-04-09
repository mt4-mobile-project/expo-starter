import { LoginCredentials, LoginResponse } from '@/types/login';
import { RegisterCredentials, RegisterResponse } from '@/types/register';
import { api } from '@/utils/api';
import { asyncStorageToken } from '@/utils/asyncStorageToken';

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  return await api.post<LoginResponse>('/auth/login', credentials);
};
export const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  return await api.post<RegisterResponse>('/auth/signup', credentials);
};

export const verifyToken = async (): Promise<boolean> => {
  try {
    const token = await asyncStorageToken.get();
    if (!token) return false;
    
    // Appel à votre endpoint de vérification de token
    await api.get('/users/me' );
    return true;
  } catch (error) {
    await asyncStorageToken.remove(); // Supprime le token invalide
    return false;
  }
};