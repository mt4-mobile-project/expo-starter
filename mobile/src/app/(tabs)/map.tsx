import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'tamagui';
import { useRef, useCallback } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { useEvents } from '@/hooks/useEvents';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { H4 } from '@/components/atoms/typography/heading';

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { location } = useLocation();
  const { data: events = [] } = useEvents();

  // Bottom sheet snap points
  const snapPoints = ['25%', '50%', '75%'];

  // Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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
              pinColor="red"
            />
          ))}
        </MapView>

        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
        >
          <BottomSheetView style={styles.contentContainer}>
            <H4>Événements à proximité</H4>
            {/* Add your bottom sheet content here */}
          </BottomSheetView>
        </BottomSheet>
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
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
