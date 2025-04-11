import { useQuery } from '@tanstack/react-query';
import { getJoinedEvents } from '@/services/events';
import type { Event } from '@/types/events';
import { getFileImage } from '@/services/files';
import { FileType } from '@/types/files';

export const useJoinedEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['joinedEvents'],
    queryFn: async () => {
      const events = await getJoinedEvents();

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
