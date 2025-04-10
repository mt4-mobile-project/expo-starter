import { StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import MapView from 'react-native-maps';
import { View, ScrollView, XStack, YStack } from 'tamagui';
import { useRef, useState } from 'react';
import { useLocation } from '@/hooks/maps/useLocation';
import { useEvents } from '@/hooks/events/useEvents';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomBottomSheet } from '@/components/molecules/bottom-sheet/bottom-sheet';
import { useBottomSheet } from '@/hooks/bottomSheet/useBottomSheet';
import { EventDetails } from '@/components/molecules/event-details/event-details';
import { MapMarkers } from '@/components/molecules/map-markers/map-markers';
import { useMarkerPress } from '@/hooks/maps/useMarkerPress';
import { EventCard } from '@/components/molecules/event-card/event-card';
import { Event } from '@/types/events';
import { SearchFilter } from '@/components/molecules/search-filter/search-filter';
import { useEventFilterStore } from '@/store/eventFilterStore';
import { Text } from '@/components/atoms/typography/text';
import { H4 } from '@/components/atoms/typography/heading';
import { Input } from '@/components/atoms/inputs/input';
import { Button } from '@/components/atoms/buttons/button';

// Add imports
import { useForm } from 'react-hook-form';
import { useCreateEvent } from '@/hooks/events/useCreateEvent';

// Add these imports at the top
import { Form } from '@/components/molecules/form/form';
import { InputGenerator } from '@/utils/generator/input-generator';
import { EVENT_INPUT_CONFIGS } from '@/configs/inputs/event-input.config';

interface EventFormData {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  street: string;
  city: string;
}

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const { location } = useLocation();
  const { data: events = [], isLoading } = useEvents();
  const { bottomSheetRef, selectedEvent, setSelectedEvent, handleSheetChanges, handleClose } =
    useBottomSheet();

  const { handleMarkerPress } = useMarkerPress({
    bottomSheetRef,
    selectedEvent,
    setSelectedEvent,
  });

  const [currentSnapIndex, setCurrentSnapIndex] = useState(1);
  const [isCreatingMode, setIsCreatingMode] = useState(false);
  const [newMarkerLocation, setNewMarkerLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Add event filter store
  const { searchTerm, setSearchTerm, activeFilter, setActiveFilter, getFilteredEvents } =
    useEventFilterStore();

  // Get filtered events
  const filteredEvents = getFilteredEvents(events);

  // Add this state with the other states
  const [showCreateNotif, setShowCreateNotif] = useState(true);

  // Update handleMapPress function
  const handleMapPress = (e: {
    nativeEvent: { coordinate: { latitude: number; longitude: number } };
  }) => {
    if (isCreatingMode) {
      const { latitude, longitude } = e.nativeEvent.coordinate;
      setNewMarkerLocation({ latitude, longitude });
      setShowCreateNotif(false); // Hide notification when map is clicked
      bottomSheetRef.current?.snapToIndex(2);
      return;
    }

    if (currentSnapIndex === 2 || currentSnapIndex === 3) {
      bottomSheetRef.current?.snapToIndex(1);
      setCurrentSnapIndex(1);
    }
    Keyboard.dismiss();
  };

  const onBottomSheetChange = (index: number) => {
    setCurrentSnapIndex(index);
    if (index !== 0) {
      handleSheetChanges(index);
    }
  };

  const handleEventCardPress = (event: Event) => {
    setSelectedEvent(event);
    bottomSheetRef.current?.snapToIndex(2);

    // Center the map on the selected event
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: event.address.latitude,
          longitude: event.address.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        500
      );
    }
  };

  const handleSearchSubmit = () => {
    Keyboard.dismiss();
  };

  const { mutate: createEvent, isPending } = useCreateEvent();
  const form = useForm<EventFormData>({
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      street: '',
      city: '',
    },
  });
  const { control } = form;

  const onSubmit = (data: EventFormData) => {
    if (!newMarkerLocation) return;

    createEvent({
      name: data.name,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      address: {
        street: data.street,
        city: data.city,
        latitude: newMarkerLocation.latitude,
        longitude: newMarkerLocation.longitude,
      },
    });
  };

  const renderBottomSheetContent = () => {
    if (isCreatingMode) {
      return (
        <ScrollView>
          <H4>Créer un événement</H4>
          <Form form={form} onSubmit={onSubmit}>
            <YStack gap={12} marginTop={24}>
              <InputGenerator
                configs={EVENT_INPUT_CONFIGS}
                control={control}
                defaultValues={form.getValues()}
              />
              <Button size="lg" onPress={form.handleSubmit(onSubmit)} disabled={isPending}>
                {isPending ? 'Création...' : 'Créer'}
              </Button>
            </YStack>
          </Form>
        </ScrollView>
      );
    }

    return selectedEvent ? (
      <EventDetails event={selectedEvent} />
    ) : (
      <ScrollView
        scrollEnabled={currentSnapIndex !== 1}
        contentContainerStyle={styles.scrollContent}
      >
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
              onPress={() => handleEventCardPress(event)}
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {isCreatingMode && showCreateNotif && (
              <XStack
                position="absolute"
                top={60}
                zIndex={1000}
                width="100%"
                justifyContent="center"
                paddingHorizontal="$4"
              >
                <XStack
                  backgroundColor="$destructive"
                  paddingVertical="$2"
                  paddingHorizontal="$4"
                  borderRadius={8}
                >
                  <Text size="lg" color="white" textAlign="center">
                    Cliquer sur la map pour créer un événement
                  </Text>
                </XStack>
              </XStack>
            )}
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: 48.8566,
                longitude: 2.3522,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              followsUserLocation={true}
              onPress={handleMapPress}
            >
              <MapMarkers
                events={filteredEvents}
                selectedEvent={selectedEvent}
                userLocation={location}
                onMarkerPress={handleMarkerPress}
                newMarkerLocation={newMarkerLocation}
                isCreatingMode={isCreatingMode}
              />
            </MapView>
          </>
        )}

        <CustomBottomSheet
          title={selectedEvent?.name}
          bottomSheetRef={bottomSheetRef}
          onChange={onBottomSheetChange}
          snapPoints={['5%', '25%', '50%', '90%']}
          initialIndex={selectedEvent ? 2 : 1}
          onClose={handleClose}
          showCloseButton={!!selectedEvent}
          onCreateModeChange={setIsCreatingMode}
        >
          {renderBottomSheetContent()}
        </CustomBottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
});
