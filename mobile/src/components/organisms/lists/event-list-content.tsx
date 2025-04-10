import { ScrollView, StyleSheet, Keyboard } from 'react-native';
import { View } from 'tamagui';
import { EventCard } from '@/components/molecules/cards/event-card';
import { SearchFilter } from '@/components/molecules/filters/search-filter';
import { useEventFilterStore } from '@/stores/events/event-filter-store';
import { Event } from '@/types/events';
import { EventDetailsCard } from '@/components/molecules/cards/event-details';

interface EventListContentProps {
  events: Event[];
  selectedEvent: Event | null;
  currentSnapIndex: number;
  onEventCardPress: (event: Event) => void;
}

export const EventListContent = ({
  events,
  selectedEvent,
  currentSnapIndex,
  onEventCardPress,
}: EventListContentProps) => {
  const { searchTerm, setSearchTerm, activeFilter, setActiveFilter, getFilteredEvents } =
    useEventFilterStore();

  const filteredEvents = getFilteredEvents(events);

  const handleSearchSubmit = () => {
    Keyboard.dismiss();
  };

  if (selectedEvent) {
    return <EventDetailsCard event={selectedEvent} />;
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
            datetime={event.start_date}
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
});
