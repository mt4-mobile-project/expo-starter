import { useState } from 'react';
import { Text, View } from 'tamagui';
import { Keyboard } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Input } from '@/components/atoms/inputs/input';
import { Button } from '@/components/atoms/buttons/button';
import { useEvents } from '@/hooks/useEvent';
import { EventCard } from '@/components/molecules/event-card/event-card';

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'date' | 'city'>('all');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { data: events, isLoading, error } = useEvents();

  const handleSearchSubmit = () => {
    Keyboard.dismiss();
  };

  const handleResetFilters = () => {
    setActiveFilter('all');
    setSelectedDate(null);
    setSelectedCity(null);
  };

  const filteredEvents = events?.filter((event) => {
    const lowerSearch = searchTerm.toLowerCase();

    const matchSearch =
      event.name.toLowerCase().includes(lowerSearch) ||
      event.address.city.toLowerCase().includes(lowerSearch);

    const matchDate = !selectedDate || event.start_date.startsWith(selectedDate);

    const matchCity =
      !selectedCity || event.address.city.toLowerCase() === selectedCity.toLowerCase();

    if (activeFilter === 'date') return matchDate && matchSearch;
    if (activeFilter === 'city') return matchCity && matchSearch;

    return matchSearch;
  });

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

      <View flexDirection="row" gap="$2">
        <Button
          variant={activeFilter === 'date' ? 'default' : 'outline'}
          onPress={() => setActiveFilter('date')}
        >
          Par date
        </Button>
        <Button
          variant={activeFilter === 'city' ? 'default' : 'outline'}
          onPress={() => setActiveFilter('city')}
        >
          Par ville
        </Button>
        <Button variant="ghost" onPress={handleResetFilters}>
          Fermer les filtres
        </Button>
      </View>

      {activeFilter === 'date' && (
        <Input placeholder="YYYY-MM-DD" value={selectedDate || ''} onChangeText={setSelectedDate} />
      )}

      {activeFilter === 'city' && (
        <Input placeholder="Ville" value={selectedCity || ''} onChangeText={setSelectedCity} />
      )}

      {isLoading && <Text>Chargement des événements...</Text>}
      {error && <Text>Erreur lors du chargement.</Text>}

      {filteredEvents &&
        filteredEvents.length > 0 &&
        filteredEvents.map((event) => (
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