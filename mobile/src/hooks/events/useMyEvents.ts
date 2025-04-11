import { useQuery } from '@tanstack/react-query';
import { getMyEvents } from '@/services/events';
import type { Event } from '@/types/events';
import { getFileImage } from '@/services/files';
import { FileType } from '@/types/files';

export const useMyEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['myEvents'],
    queryFn: async () => {
      const events = await getMyEvents();

      const eventsWithImages = await Promise.all(
        events.map(async (event) => {
          const imageUrl = await getFileImage(FileType.Event, event.id);
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
