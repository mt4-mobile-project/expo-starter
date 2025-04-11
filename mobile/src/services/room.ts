import { api } from '@/utils/api';
import { Room } from '@/types/room';

export const getRooms = async (): Promise<Room[]> => {
  const response = await api.get<Room[]>('/rooms');
  console.log('Response from getRooms:', response); // Log the response data
  return response;
};
