import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const PARIS_LOCATION = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

export const useLocation = () => {
  const [location, setLocation] = useState(PARIS_LOCATION);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      try {
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const newRegion = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };

        setLocation(newRegion);
        return newRegion;
      } catch {
        setLocation(PARIS_LOCATION);
        return PARIS_LOCATION;
      }
    })();
  }, []);

  return { location, PARIS_LOCATION };
};
