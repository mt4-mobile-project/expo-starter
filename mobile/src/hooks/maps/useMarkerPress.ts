import { useCallback } from 'react';
import { Event } from '@/types/events';
import { BottomSheetRefProps } from '@/types/bottom-sheet';

interface UseMarkerPressProps {
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
}

export const useMarkerPress = ({
  bottomSheetRef,
  selectedEvent,
  setSelectedEvent,
}: UseMarkerPressProps) => {
  const handleMarkerPress = useCallback(
    (event: Event) => {
      if (selectedEvent?.id === event.id) {
        setSelectedEvent(null);
        bottomSheetRef.current?.snapToIndex(1); // Close the sheet if the same event is clicked again
      } else {
        setSelectedEvent(event);
        bottomSheetRef.current?.snapToIndex(2); // Snap to 50% when an event is clicked
      }
    },
    [selectedEvent, setSelectedEvent, bottomSheetRef]
  );

  return { handleMarkerPress };
};
