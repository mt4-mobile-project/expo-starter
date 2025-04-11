import { useQuery } from '@tanstack/react-query';
import { getAllEvents, getJoinedEvents } from '@/services/events';
import type { Event } from '@/types/events';
import { getFileImage } from '@/services/files';
import { FileType } from '@/types/files';

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const [allEvents, joinedEvents] = await Promise.all([getAllEvents(), getJoinedEvents()]);

      const eventsWithImages = await Promise.all(
        allEvents.map(async (event) => {
          const imageUrl = await getFileImage(FileType.Event, event.id);
          return {
            ...event,
            image: imageUrl,
            isJoined: joinedEvents.some((joinedEvent) => joinedEvent.id === event.id),
          };
        })
      );

      return eventsWithImages;
    },
  });
};
