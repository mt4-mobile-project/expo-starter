import { ReactNode } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { XStack } from 'tamagui';
import { IconButton } from '@/components/atoms/buttons/icon-button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { H4 } from '@/components/atoms/typography/heading';

interface CustomBottomSheetProps {
  title: string;
  children: ReactNode;
  snapPoints?: string[];
  initialIndex?: number;
  onChange?: (index: number) => void;
  bottomSheetRef?: React.RefObject<BottomSheet>;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export function CustomBottomSheet({
  title,
  children,
  snapPoints = ['25%', '50%', '75%'],
  initialIndex = 1,
  onChange,
  bottomSheetRef,
  onClose,
  showCloseButton = false,
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
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
          <H4>{title}</H4>
          {showCloseButton && (
            <IconButton variant="bottomless" onPress={onClose}>
              <MaterialIcons name="close" size={24} color="black" />
            </IconButton>
          )}
        </XStack>
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
