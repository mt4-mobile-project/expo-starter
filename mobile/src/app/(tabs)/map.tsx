import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { View, XStack } from 'tamagui';
import { useLocation } from '@/hooks/maps/useLocation';
import { useEvents } from '@/hooks/events/useEvents';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomBottomSheet } from '@/components/molecules/sheets/bottom-sheet';
import { useBottomSheet } from '@/hooks/sheets/useBottomSheet';
import { MapMarkers } from '@/components/molecules/markers/map-markers';
import { useMarkerPress } from '@/hooks/maps/useMarkerPress';
import { Text } from '@/components/atoms/typography/text';
import { useEventCreationStore } from '@/stores/events/event-creation-store';
import { useMapInteractions } from '@/hooks/maps/useMapInteractions';
import { EventListContent } from '@/components/organisms/lists/event-list-content';
import { EventCreationForm } from '@/components/molecules/forms/event-creation-form';

export default function MapScreen() {
  const { location } = useLocation();
  const { data: allEvents = [], isLoading } = useEvents();

  const { bottomSheetRef, selectedEvent, setSelectedEvent, handleClose } = useBottomSheet();

  const { isCreatingMode, showCreateNotif, newMarkerLocation } = useEventCreationStore();

  const { handleMarkerPress } = useMarkerPress({
    bottomSheetRef,
    selectedEvent,
    setSelectedEvent,
  });

  const { mapRef, currentSnapIndex, handleMapPress, handleEventCardPress, onBottomSheetChange } =
    useMapInteractions(bottomSheetRef, setSelectedEvent);

  const renderBottomSheetContent = () => {
    if (isCreatingMode) {
      return <EventCreationForm bottomSheetRef={bottomSheetRef} />;
    }

    return (
      <EventListContent
        events={allEvents}
        selectedEvent={selectedEvent}
        currentSnapIndex={currentSnapIndex}
        onEventCardPress={handleEventCardPress}
      />
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {isCreatingMode && showCreateNotif && (
              <XStack
                position="absolute"
                top={60}
                zIndex={1000}
                width="100%"
                justifyContent="center"
                paddingHorizontal="$4"
              >
                <XStack
                  backgroundColor="$destructive"
                  paddingVertical="$2"
                  paddingHorizontal="$4"
                  borderRadius={8}
                >
                  <Text size="lg" color="white" textAlign="center">
                    Cliquer sur la map pour créer un événement
                  </Text>
                </XStack>
              </XStack>
            )}
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
              onPress={handleMapPress}
            >
              <MapMarkers
                events={allEvents}
                selectedEvent={selectedEvent}
                userLocation={location}
                onMarkerPress={handleMarkerPress}
                newMarkerLocation={newMarkerLocation}
                isCreatingMode={isCreatingMode}
              />
            </MapView>
          </>
        )}

        <CustomBottomSheet
          bottomSheetRef={bottomSheetRef}
          onChange={onBottomSheetChange}
          snapPoints={['5%', '25%', '50%', '90%']}
          initialIndex={selectedEvent ? 2 : 1}
          onClose={handleClose}
          showCloseButton={!!selectedEvent}
          onCreateModeChange={useEventCreationStore().setIsCreatingMode}
        >
          {renderBottomSheetContent()}
        </CustomBottomSheet>
      </View>
    </GestureHandlerRootView>
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
