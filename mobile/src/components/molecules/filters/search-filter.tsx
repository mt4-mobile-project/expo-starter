import { Keyboard } from 'react-native';
import { YStack, XStack } from 'tamagui';
import Octicons from '@expo/vector-icons/Octicons';
import { Input } from '@/components/atoms/inputs/input';
import { Button } from '@/components/atoms/buttons/button';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: 'title' | 'date' | 'address';
  setActiveFilter: (filter: 'title' | 'date' | 'address') => void;
  onSubmit?: () => void;
}

export const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  onSubmit,
}: SearchFilterProps) => {
  const handleSearchSubmit = () => {
    Keyboard.dismiss();
    if (onSubmit) onSubmit();
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
    <YStack space="$3">
      <Input
        placeholder={placeholder}
        size="lg"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
        icon={<Octicons name="search" size={20} color="$borderMuted" />}
      />

      <XStack space="$2">
        <Button
          variant={activeFilter === 'title' ? 'secondary' : 'outline'}
          onPress={() => setActiveFilter('title')}
        >
          Titre
        </Button>
        <Button
          variant={activeFilter === 'date' ? 'secondary' : 'outline'}
          onPress={() => setActiveFilter('date')}
        >
          Date
        </Button>
        <Button
          variant={activeFilter === 'address' ? 'secondary' : 'outline'}
          onPress={() => setActiveFilter('address')}
        >
          Adresse
        </Button>
      </XStack>
    </YStack>
  );
};
