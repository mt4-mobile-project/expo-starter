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
  const {
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    selectedDate,
    setSelectedDate,
    selectedAddress, // Ensure this is included
    setSelectedAddress, // Ensure this is included
    filteredEvents,
    handleResetFilters,
  } = useEventFilters(events);

  const handleSearchSubmit = () => {
    Keyboard.dismiss();
  };

  return (
    <View flex={1} backgroundColor="$background" padding="$4" gap="$4">
      <Input
        placeholder="Rechercher"
        variant="outline"
        size="lg"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
        icon={<FontAwesome name="search" size={18} color="#aaa" />}
      />

      {/* Filter buttons remain unchanged */}
      <View flexDirection="row" gap="$2">
        <Button
          variant={activeFilter === 'date' ? 'default' : 'outline'}
          onPress={() => setActiveFilter('date')}
        >
          Par date
        </Button>
        <Button
          variant={activeFilter === 'address' ? 'default' : 'outline'} // Use 'address' instead of 'city'
          onPress={() => setActiveFilter('address')}
        >
          Par adresse
        </Button>
        <Button variant="ghost" onPress={handleResetFilters}>
          Fermer les filtres
        </Button>
      </View>

      {/* Conditional inputs remain unchanged */}
      {activeFilter === 'date' && (
        <Input placeholder="YYYY-MM-DD" value={selectedDate || ''} onChangeText={setSelectedDate} />
      )}

      {activeFilter === 'address' && ( // Use 'address' instead of 'city'
        <Input
          placeholder="Adresse"
          value={selectedAddress || ''}
          onChangeText={setSelectedAddress}
        />
      )}

      {/* Results section remains unchanged */}
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
