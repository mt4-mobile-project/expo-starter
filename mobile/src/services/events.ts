import { api } from '@/utils/api';
import type { Event } from '@/types/events';

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>('/events');
  return response;
};

export const getEventImage = async (eventId: number): Promise<string> => {
  try {
    const response = await api.get<ArrayBuffer>(`/files/event/${eventId}`, {
      headers: {
        Accept: 'image/*',
      },
      responseType: 'arraybuffer',
    });

    // Convertir ArrayBuffer en base64
    const bytes = new Uint8Array(response);
    let binary = '';
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return btoa(binary);
  } catch (error) {
    console.warn(`Failed to fetch image for event ${eventId}:`, error);
    return '';
  }
};
