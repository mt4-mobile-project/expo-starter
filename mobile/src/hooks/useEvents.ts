import { useQuery } from '@tanstack/react-query';
import { getAllEvents } from '@/services/events';
import type { Event } from '@/types/events';

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: getAllEvents,
  });
};
