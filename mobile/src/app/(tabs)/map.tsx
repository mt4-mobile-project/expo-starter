import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'tamagui';
import { useRef } from 'react';
import { useLocation } from '@/hooks/useLocation';

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const { location, PARIS_LOCATION } = useLocation();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={PARIS_LOCATION}
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
        />
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
