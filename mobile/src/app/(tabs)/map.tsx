import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { View, YStack } from 'tamagui';
import { useRef, useCallback, useState } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { useEvents } from '@/hooks/useEvents';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomBottomSheet } from '@/components/molecules/bottom-sheet/bottom-sheet';
import { Event } from '@/types/events';
import { Text } from '@/components/atoms/typography/text';

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { location } = useLocation();
  const { data: events = [] } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      setSelectedEvent(null);
      // Ajout d'un petit délai pour laisser le temps à l'animation de se terminer
      setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(0);
      }, 100);
    }
  }, []);

  const handleMarkerPress = useCallback(
    (event: Event) => {
      if (selectedEvent?.id === event.id) {
        // Si on clique sur le même marqueur, on le désélectionne
        setSelectedEvent(null);
        bottomSheetRef.current?.snapToIndex(0);
      } else {
        // Sinon on sélectionne le nouveau marqueur
        setSelectedEvent(event);
        bottomSheetRef.current?.snapToIndex(1);
      }
    },
    [selectedEvent]
  );

  console.log(events, 'lllllllllllllll');

  const renderEventDetails = () => {
    if (!selectedEvent) return null;

    return (
      <YStack space="$4" padding="$4">
        <Text size="base">{selectedEvent.description}</Text>
        <Text size="lg" weight="bold">
          Adresse
        </Text>
        <Text size="base">{selectedEvent.address.street}</Text>
        <Text size="base">{selectedEvent.address.city}</Text>
        <Text size="lg" weight="bold">
          Date
        </Text>
        <Text size="base">Du: {new Date(selectedEvent.start_date).toLocaleDateString()}</Text>
        <Text size="base">Au: {new Date(selectedEvent.end_date).toLocaleDateString()}</Text>
      </YStack>
    );
  };

  const handleClose = useCallback(() => {
    setSelectedEvent(null);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
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
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Ma position"
            pinColor="blue"
          />
          {events.map((event) => (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.address.latitude,
                longitude: event.address.longitude,
              }}
              title={event.name}
              description={`${event.address.street}, ${event.address.city}`}
              pinColor={selectedEvent?.id === event.id ? 'green' : 'red'}
              onPress={() => handleMarkerPress(event)}
            />
          ))}
        </MapView>

        <CustomBottomSheet
          title={selectedEvent ? selectedEvent.name : 'Événements à proximité'}
          bottomSheetRef={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={['25%', '50%', '75%']}
          initialIndex={0}
          onClose={handleClose}
          showCloseButton={!!selectedEvent}
        >
          {renderEventDetails()}
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
});
