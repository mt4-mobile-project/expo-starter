import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { View, YStack, Text } from 'tamagui';
import { useRef, useCallback, useState } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { useEvents } from '@/hooks/useEvents';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomBottomSheet } from '@/components/molecules/bottom-sheet/bottom-sheet';
import { Event } from '@/types/events';

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { location } = useLocation();
  const { data: events = [] } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      setSelectedEvent(null);
    }
  }, []);

  const handleMarkerPress = useCallback((event: Event) => {
    setSelectedEvent(event);
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  console.log(events, "lllllllllllllll");

  const renderEventDetails = () => {
    if (!selectedEvent) return null;

    return (
      <YStack space="$4" padding="$4">
        <Text>{selectedEvent.description}</Text>
        <Text fontSize={16} fontWeight="500">
          Adresse
        </Text>
        <Text>{selectedEvent.address.street}</Text>
        <Text>{selectedEvent.address.city}</Text>
        <Text fontSize={16} fontWeight="500">
          Date
        </Text>
        <Text>Du: {new Date(selectedEvent.start_date).toLocaleDateString()}</Text>
        <Text>Au: {new Date(selectedEvent.end_date).toLocaleDateString()}</Text>
      </YStack>
    );
  };

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
              pinColor="red"
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
