import { useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import MapView from 'react-native-maps';
import { Event } from '@/types/events';
import { useEventCreationStore } from '@/stores/events/event-creation-store';

export const useMapInteractions = (
  bottomSheetRef: any,
  setSelectedEvent: (event: Event | null) => void
) => {
  const mapRef = useRef<MapView | null>(null);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(1);

  const { isCreatingMode, setNewMarkerLocation, setShowCreateNotif } = useEventCreationStore();

  const handleMapPress = (e: {
    nativeEvent: { coordinate: { latitude: number; longitude: number } };
  }) => {
    if (isCreatingMode) {
      const { latitude, longitude } = e.nativeEvent.coordinate;
      setNewMarkerLocation({ latitude, longitude });
      setShowCreateNotif(false);
      bottomSheetRef.current?.snapToIndex(2);
      return;
    }

    if (currentSnapIndex === 2 || currentSnapIndex === 3) {
      bottomSheetRef.current?.snapToIndex(1);
      setCurrentSnapIndex(1);
    }
    Keyboard.dismiss();
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

  const onBottomSheetChange = (index: number) => {
    setCurrentSnapIndex(index);
    if (index !== 0) {
      // Assuming handleSheetChanges is a function passed from parent
      // handleSheetChanges(index);
    }
  };

  return {
    mapRef,
    currentSnapIndex,
    handleMapPress,
    handleEventCardPress,
    onBottomSheetChange,
  };
};
