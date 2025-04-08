import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'tamagui';
import { useRef } from 'react';
import { useLocation } from '@/hooks/useLocation';

// Mock data for musical events
const mockEvents = [
  {
    id: 1,
    title: 'Dragon Gate Jazz Night',
    location: {
      latitude: 37.7936,
      longitude: -122.4053,
      venue: 'Dragon Gate, Chinatown',
    },
    date: '2024-02-15',
  },
  {
    id: 2,
    title: 'SFMOMA Music Festival',
    location: {
      latitude: 37.7858,
      longitude: -122.4008,
      venue: 'SF Museum of Modern Art',
    },
    date: '2024-02-20',
  },
];

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const { location } = useLocation();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
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
        {mockEvents.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.location.latitude,
              longitude: event.location.longitude,
            }}
            title={event.title}
            description={`${event.location.venue} - ${event.date}`}
            pinColor="red"
          />
        ))}
      </MapView>
    </View>
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
