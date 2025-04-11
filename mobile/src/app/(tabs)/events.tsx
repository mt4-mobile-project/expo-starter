import { View } from 'tamagui';
import { Text } from '@/components/atoms/typography/text';
import { useJoinedEvents } from '@/hooks/events/useJoinedEvents';
import { useState } from 'react';
import { EventListContent } from '@/components/organisms/lists/event-list-content';
import { Event } from '@/types/events';

export default function EventsScreen() {
  const { data: events, isLoading, error } = useJoinedEvents();
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
    <View backgroundColor="$background" flex={1} paddingTop={16}>
      <EventListContent
        events={events || []}
        selectedEvent={selectedEvent}
        currentSnapIndex={0}
        onEventCardPress={(event) => setSelectedEvent(event)}
        onBackPress={() => setSelectedEvent(null)} // Add back button handler
      />
    </View>
  );
}
