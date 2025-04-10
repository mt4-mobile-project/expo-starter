import { StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import MapView from 'react-native-maps';
import { View, ScrollView } from 'tamagui';
import { useEffect, useRef, useState } from 'react';
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

  // Get filter state and methods from the store
  const { searchTerm, setSearchTerm, activeFilter, setActiveFilter, getFilteredEvents } =
    useEventFilterStore();

  // Filter events based on search criteria
  const filteredEvents = getFilteredEvents(events);

  // Ajout de useEffect pour centrer la carte sur l'événement sélectionné
  useEffect(() => {
    if (selectedEvent && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedEvent.address.latitude,
          longitude: selectedEvent.address.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        500
      );
    }
  }, [selectedEvent]);

  const handleMapPress = () => {
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
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
            />
          </MapView>
        )}

        {/* Search and filter component with absolute positioning */}

        <CustomBottomSheet
          // title={selectedEvent ? selectedEvent.name : 'Événements à proximité'}
          bottomSheetRef={bottomSheetRef}
          onChange={onBottomSheetChange}
          snapPoints={['5%', '25%', '50%', '90%']}
          initialIndex={selectedEvent ? 2 : 1}
          onClose={handleClose}
          showCloseButton={!!selectedEvent}
        >
          {selectedEvent ? (
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
          )}
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
