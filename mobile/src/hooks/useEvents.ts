import { useQuery } from '@tanstack/react-query';
import { getAllEvents, getEventImage } from '@/services/events';
import type { Event } from '@/types/events';

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const events = await getAllEvents();

      // Fetch all images in parallel for better performance
      const eventsWithImages = await Promise.all(
        events.map(async (event) => {
          const imageUrl = await getEventImage(event.id);
          return {
            ...event,
            image: imageUrl,
          };
        })
      );

      return eventsWithImages;
    },
  });
};
