import { forwardRef } from 'react';
import { Platform } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';

export const WebCompatibleMap = forwardRef<MapView, MapViewProps>((props, ref) => {
  if (Platform.OS === 'web') {
    // On web, we need to handle the map differently
    return <MapView ref={ref} {...props} provider="google" />;
  }

  // On native platforms, use the standard MapView
  return <MapView ref={ref} {...props} />;
});

WebCompatibleMap.displayName = 'WebCompatibleMap';
