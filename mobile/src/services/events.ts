import { api } from '@/utils/api';
import type { Event } from '@/types/events';

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>('/events');
  return response;
};

export interface CreateEventDTO {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  address: {
    street: string;
    city: string;
    latitude: number;
    longitude: number;
  };
}

export const createEvent = async (data: CreateEventDTO): Promise<Event> => {
  const response = await api.post<Event>('/events', data);
  return response;
};

export const getLoggedUserEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>('/events/mes');
  return response;
};
