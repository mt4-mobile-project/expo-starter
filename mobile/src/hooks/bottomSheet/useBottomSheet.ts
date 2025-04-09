import { useCallback, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Event } from '@/types/events';

export const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      setSelectedEvent(null);
      setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(0);
      }, 100);
    }
  }, []);

  const handleClose = useCallback(() => {
    setSelectedEvent(null);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return {
    bottomSheetRef,
    selectedEvent,
    setSelectedEvent,
    handleSheetChanges,
    handleClose,
  };
};
