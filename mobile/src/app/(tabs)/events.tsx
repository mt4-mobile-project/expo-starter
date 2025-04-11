import { View } from 'tamagui';
import { useMyEvents } from '@/hooks/events/useMyEvents';
import { useState } from 'react';
import { EventListContent } from '@/components/organisms/lists/event-list-content';
import type { Event } from '@/types/events';
import { Text } from '@/components/atoms/typography/text';

export default function EventsScreen() {
  const { data: events, isLoading, error } = useMyEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (isLoading)
    return (
      <View backgroundColor="$background">
        <Text>Chargement des événements...</Text>
      </View>
    );
  if (error)
    return (
      <View backgroundColor="$background">
        <Text>Erreur lors du chargement.</Text>
      </View>
    );

  return (
    <View backgroundColor="$background" flex={1}>
      <EventListContent
        events={events || []}
        selectedEvent={selectedEvent}
        currentSnapIndex={0}
        onEventCardPress={(event) => setSelectedEvent(event)}
      />
    </View>
  );
}
