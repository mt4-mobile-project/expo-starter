import { CreateProfileData, ProfileResponse } from '@/types/profile';
import { api } from '@/utils/api';

export const createProfile = async (profileData: CreateProfileData): Promise<ProfileResponse> => {
  return await api.post<ProfileResponse>('/profiles', profileData);
};

export const getProfile = async (): Promise<ProfileResponse> => {
  return await api.get<ProfileResponse>('/profiles/me');
};

export const editProfile = async (
  id: number,
  profileData: Partial<ProfileResponse>
): Promise<ProfileResponse> => {
  return await api.put<ProfileResponse>(`/profiles/${id}`, profileData);
};
