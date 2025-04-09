import { api } from '@/utils/api';
import type { Event } from '@/types/events';

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>('/events');
  return response;
};
