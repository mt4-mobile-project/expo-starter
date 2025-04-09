// services/event.ts
import { api } from "@/utils/api";
import { Event } from "@/types/event";

export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get('/events');
  console.log('API response:', response);

  if (Array.isArray(response)) {
    return response as Event[];
  }

  return [response as Event];
};
