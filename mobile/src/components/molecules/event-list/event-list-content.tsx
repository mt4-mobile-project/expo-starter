import { ScrollView, StyleSheet, Keyboard } from 'react-native';
import { View } from 'tamagui';
import { EventCard } from '@/components/molecules/event-card/event-card';
import { SearchFilter } from '@/components/molecules/search-filter/search-filter';
import { useEventFilterStore } from '@/store/eventFilterStore';
import { Event } from '@/types/events';
import { EventDetails } from '@/components/molecules/event-details/event-details';

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
    return <EventDetails event={selectedEvent} />;
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
      <View marginTop="$6" gap="$6">
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
