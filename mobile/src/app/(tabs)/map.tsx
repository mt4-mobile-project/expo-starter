import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'tamagui';
import { useRef } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { useEvents } from '@/hooks/useEvents';

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const { location } = useLocation();
  const { data: events = [] } = useEvents();

  return (
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
