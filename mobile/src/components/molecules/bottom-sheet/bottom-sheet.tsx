import { ReactNode, useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { XStack } from 'tamagui';
import { IconButton } from '@/components/atoms/buttons/icon-button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { H4 } from '@/components/atoms/typography/heading';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';

interface CustomBottomSheetProps {
  title?: string;
  children: ReactNode;
  snapPoints?: string[];
  initialIndex?: number;
  onChange?: (index: number) => void;
  bottomSheetRef?: React.RefObject<BottomSheet>;
  onClose?: () => void;
  showCloseButton?: boolean;
  onCreateModeChange?: (isCreating: boolean) => void;
}

export function CustomBottomSheet({
  title,
  children,
  snapPoints = ['5%', '25%', '50%', '90%'],
  initialIndex = 1,
  onChange,
  bottomSheetRef,
  onClose,
  showCloseButton = false,
  onCreateModeChange,
}: CustomBottomSheetProps) {
  const [isCreating, setIsCreating] = useState(false);
  const animatedPosition = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedPosition.value - 24 }],
    };
  });

  const handlePlusButtonPress = () => {
    const newCreatingState = !isCreating;
    setIsCreating(newCreatingState);
    onCreateModeChange?.(newCreatingState);
    bottomSheetRef?.current?.snapToIndex(0);
  };

  return (
    <>
      <Animated.View style={[styles.floatingButton, animatedStyle]}>
        <IconButton
          variant="bottomless"
          style={isCreating ? styles.iconButtonClose : styles.iconButtonCreated}
          onPress={handlePlusButtonPress}
        >
          {isCreating ? (
            <AntDesign name="close" size={24} color="black" />
          ) : (
            <AntDesign name="plus" size={24} color="white" />
          )}
        </IconButton>
      </Animated.View>
      <BottomSheet
        ref={bottomSheetRef}
        index={initialIndex}
        snapPoints={snapPoints}
        onChange={onChange}
        enablePanDownToClose={false}
        animatedPosition={animatedPosition}
      >
        <BottomSheetView style={styles.contentContainer}>
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
            {title && <H4>{title}</H4>}
            {showCloseButton && (
              <IconButton variant="bottomless" onPress={onClose}>
                <MaterialIcons name="close" size={24} color="black" />
              </IconButton>
            )}
          </XStack>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  floatingButton: {
    position: 'absolute',
    right: 24,
    zIndex: 1000,
  },
  iconButtonClose: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ translateY: -48 }], // Changed from -24 to -48 to move it higher
  },
  iconButtonCreated: {
    backgroundColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ translateY: -48 }], // Changed from -24 to -48 to move it higher
  },
});
