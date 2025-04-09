import { ReactNode } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { H4 } from '@/components/atoms/typography/heading';

interface CustomBottomSheetProps {
  title: string;
  children: ReactNode;
  snapPoints?: string[];
  initialIndex?: number;
  onChange?: (index: number) => void;
  bottomSheetRef?: React.RefObject<BottomSheet>;
}

export function CustomBottomSheet({
  title,
  children,
  snapPoints = ['25%', '50%', '75%'],
  initialIndex = 1,
  onChange,
  bottomSheetRef,
}: CustomBottomSheetProps) {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={initialIndex}
      snapPoints={snapPoints}
      onChange={onChange}
      enablePanDownToClose={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        <H4>{title}</H4>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
