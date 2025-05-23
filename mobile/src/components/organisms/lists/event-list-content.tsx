import { ScrollView, StyleSheet, Keyboard } from 'react-native';
import { View } from 'tamagui';
import { EventCard } from '@/components/molecules/cards/event-card';
import { SearchFilter } from '@/components/molecules/filters/search-filter';
import { useEventFilterStore } from '@/stores/events/event-filter-store';
import { Event } from '@/types/events';
import { EventDetailsCard } from '@/components/molecules/cards/event-details';
import { Button } from '@/components/atoms/buttons/button';

interface EventListContentProps {
  events: Event[];
  selectedEvent: Event | null;
  currentSnapIndex: number;
  onEventCardPress: (event: Event) => void;
  onBackPress?: () => void; // Add back button handler
}

export const EventListContent = ({
  events,
  selectedEvent,
  currentSnapIndex,
  onEventCardPress,
  onBackPress,
}: EventListContentProps) => {
  const { searchTerm, setSearchTerm, activeFilter, setActiveFilter, getFilteredEvents } =
    useEventFilterStore();

  const filteredEvents = getFilteredEvents(events);

  const handleSearchSubmit = () => {
    Keyboard.dismiss();
  };

  if (selectedEvent) {
    const eventWithJoinStatus =
      events.find((event) => event.id === selectedEvent.id) || selectedEvent;

    return (
      <View style={styles.detailsContainer}>
        {onBackPress && (
          <Button variant="outline" onPress={onBackPress} style={styles.backButton}>
            Retour
          </Button>
        )}
        <EventDetailsCard event={selectedEvent} isJoined={eventWithJoinStatus.isJoined || false} />
      </View>
    );
  }

  return (
    <ScrollView scrollEnabled={currentSnapIndex !== 1} contentContainerStyle={styles.scrollContent}>
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onSubmit={handleSearchSubmit}
      />
      <View marginTop="$4" gap="$4" backgroundColor="$muted" padding={16}>
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            image={event.image || ''}
            title={event.name}
            address={`${event.address.street}, ${event.address.city}`}
            datetime={`${new Date(event.start_date).toLocaleDateString()} - ${new Date(event.end_date).toLocaleDateString()}`}
            onPress={() => onEventCardPress(event)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  detailsContainer: {
    flex: 1,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    right: 16, // Changed from left to right
    zIndex: 10,
  },
});
