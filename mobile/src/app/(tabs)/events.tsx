import { Text, View } from 'tamagui';
import { Keyboard } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Input } from '@/components/atoms/inputs/input';
import { Button } from '@/components/atoms/buttons/button';
import { useEvents } from '@/hooks/useEvent';
import { EventCard } from '@/components/molecules/event-card/event-card';
import { useEventFilters } from '@/hooks/events/useEventFilters';

export default function HomeScreen() {
  const { data: events, isLoading, error } = useEvents();
  const { searchTerm, setSearchTerm, activeFilter, setActiveFilter, filteredEvents } =
    useEventFilters(events);

  const handleSearchSubmit = () => {
    Keyboard.dismiss();
  };

  // Determine the placeholder based on the active filter
  const placeholder =
    activeFilter === 'title'
      ? 'Rechercher par titre'
      : activeFilter === 'date'
        ? '(YYYY-MM-DD)'
        : activeFilter === 'address'
          ? 'Rechercher par adresse'
          : 'Rechercher';

  return (
    <View flex={1} backgroundColor="$background" padding="$4" gap="$4">
      <Input
        placeholder={placeholder}
        variant="outline"
        size="lg"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
        icon={<FontAwesome name="search" size={18} color="#aaa" />}
      />

      {/* Filter buttons */}
      <View flexDirection="row" gap="$2">
        <Button
          variant={activeFilter === 'title' ? 'secondary' : 'outline'}
          onPress={() => setActiveFilter('title')}
        >
          Par titre
        </Button>
        <Button
          variant={activeFilter === 'date' ? 'secondary' : 'outline'}
          onPress={() => setActiveFilter('date')}
        >
          Par date
        </Button>
        <Button
          variant={activeFilter === 'address' ? 'secondary' : 'outline'}
          onPress={() => setActiveFilter('address')}
        >
          Par adresse
        </Button>
      </View>

      {/* Results section */}
      {isLoading && <Text>Chargement des événements...</Text>}
      {error && <Text>Erreur lors du chargement.</Text>}
      {filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          imageUrl="https://picsum.photos/300"
          title={event.name}
          address={`${event.address.street}, ${event.address.city}`}
          datetime={event.start_date}
        />
      ))}
    </View>
  );
}
