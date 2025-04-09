// hooks/useEvent.ts
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/services/event';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
};
