import { StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import MapView from 'react-native-maps';
import { View, ScrollView, XStack, YStack } from 'tamagui';
import { useRef, useState } from 'react';
import { useLocation } from '@/hooks/maps/useLocation';
import { useEvents } from '@/hooks/events/useEvents';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomBottomSheet } from '@/components/molecules/bottom-sheet/bottom-sheet';
import { useBottomSheet } from '@/hooks/bottomSheet/useBottomSheet';
import { EventDetails } from '@/components/molecules/event-details/event-details';
import { MapMarkers } from '@/components/molecules/map-markers/map-markers';
import { useMarkerPress } from '@/hooks/maps/useMarkerPress';
import { EventCard } from '@/components/molecules/event-card/event-card';
import { Event } from '@/types/events';
import { SearchFilter } from '@/components/molecules/search-filter/search-filter';
import { useEventFilterStore } from '@/store/eventFilterStore';
import { Text } from '@/components/atoms/typography/text';
import { H4 } from '@/components/atoms/typography/heading';
import { Button } from '@/components/atoms/buttons/button';

// Add imports
import { useForm } from 'react-hook-form';
import { useCreateEvent } from '@/hooks/events/useCreateEvent';

// Add these imports at the top
import { Form } from '@/components/molecules/form/form';
import { InputGenerator } from '@/utils/generator/input-generator';
import { EVENT_INPUT_CONFIGS } from '@/configs/inputs/event-input.config';
import { useCreationModeStore } from '@/stores/creation-mode-store';
import { useFileUpload } from '@/hooks/files/useFileUpload';
import { FileType } from '@/types/files';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

interface EventFormData {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  street: string;
  city: string;
}

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const { location } = useLocation();
  const { data: events = [], isLoading } = useEvents();
  const { bottomSheetRef, selectedEvent, setSelectedEvent, handleSheetChanges, handleClose } =
    useBottomSheet();

  // Add form initialization here
  const form = useForm<EventFormData>({
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      street: '',
      city: '',
    },
  });

  const { control } = form;

  const { handleMarkerPress } = useMarkerPress({
    bottomSheetRef,
    selectedEvent,
    setSelectedEvent,
  });

  const [currentSnapIndex, setCurrentSnapIndex] = useState(1);
  // Remplacer le state local par le store
  // const [isCreatingMode, setIsCreatingMode] = useState(false);
  const { isCreating: isCreatingMode, setIsCreating: setIsCreatingMode } = useCreationModeStore();
  const [newMarkerLocation, setNewMarkerLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Add event filter store
  const { searchTerm, setSearchTerm, activeFilter, setActiveFilter, getFilteredEvents } =
    useEventFilterStore();

  // Get filtered events
  const filteredEvents = getFilteredEvents(events);

  // Add this state with the other states
  const [showCreateNotif, setShowCreateNotif] = useState(true);

  // Update handleMapPress function
  const handleMapPress = (e: {
    nativeEvent: { coordinate: { latitude: number; longitude: number } };
  }) => {
    if (isCreatingMode) {
      const { latitude, longitude } = e.nativeEvent.coordinate;
      setNewMarkerLocation({ latitude, longitude });
      setShowCreateNotif(false); // Hide notification when map is clicked
      bottomSheetRef.current?.snapToIndex(2);
      return;
    }

    if (currentSnapIndex === 2 || currentSnapIndex === 3) {
      bottomSheetRef.current?.snapToIndex(1);
      setCurrentSnapIndex(1);
    }
    Keyboard.dismiss();
  };

  const onBottomSheetChange = (index: number) => {
    setCurrentSnapIndex(index);
    if (index !== 0) {
      handleSheetChanges(index);
    }
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

  const handleSearchSubmit = () => {
    Keyboard.dismiss();
  };

  // Dans votre composant principal
  const { mutate: createEvent, isPending: isCreatingEventPending } = useCreateEvent();
  const { mutate: uploadImage, isPending: isUploadingPending } = useFileUpload();
  // Ajoutez cette ligne pour pouvoir rafraîchir les données
  const { refetch } = useEvents();

  // Ajoutez ces états pour gérer le formulaire multi-étapes
  const [formStep, setFormStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [createdEventId, setCreatedEventId] = useState<number | null>(null);

  // Fonction pour sélectionner une image depuis la galerie
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Première étape: création de l'événement
  const onSubmitStep1 = (data: EventFormData) => {
    if (!newMarkerLocation) return;

    createEvent(
      {
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        address: {
          street: data.street,
          city: data.city,
          latitude: newMarkerLocation.latitude,
          longitude: newMarkerLocation.longitude,
        },
      },
      {
        onSuccess: (response) => {
          console.log('Événement créé avec succès:', response);
          // Stocker l'ID de l'événement créé pour l'upload de l'image
          setCreatedEventId(response.id);
          // Passer à l'étape suivante
          setFormStep(2);
        },
      }
    );
  };

  // Deuxième étape: upload de l'image
  // Dans votre fonction onSubmitStep2
  const onSubmitStep2 = () => {
    if (!selectedImage || !createdEventId) return;

    console.log("Tentative d'upload avec:", {
      uri: selectedImage,
      filableId: createdEventId,
      filableType: FileType.Event,
      filableTypeString: FileType.Event.toString(),
      filableTypeValue: FileType.Event === 'event' ? 'Égal à event' : 'Différent de event',
    });

    uploadImage(
      {
        uri: selectedImage,
        filableId: createdEventId,
        filableType: FileType.Event,
      },
      {
        onSuccess: () => {
          // Réinitialiser le formulaire après upload réussi
          form.reset();
          setSelectedImage(null);
          setCreatedEventId(null);
          setFormStep(1);

          // Fermer le bottom sheet et revenir à l'état précédent
          bottomSheetRef.current?.snapToIndex(1);

          // Réinitialiser l'état de création
          setIsCreatingMode(false);
          setNewMarkerLocation(null);
          setShowCreateNotif(true);

          // Rafraîchir la liste des événements pour afficher la nouvelle image
          refetch();
        },
        onError: (error: unknown) => {
          console.error("Erreur lors de l'upload de l'image:", error);
          // Vous pouvez ajouter un toast ou une notification d'erreur ici
        },
      }
    );
  };

  // Fonction pour annuler et revenir à l'étape précédente
  const handleCancel = () => {
    if (formStep === 2) {
      setFormStep(1);
    } else {
      // Annuler complètement
      form.reset();
      setSelectedImage(null);
      setCreatedEventId(null);
      setFormStep(1);
      bottomSheetRef.current?.snapToIndex(1);
      setIsCreatingMode(false);
      setNewMarkerLocation(null);
      setShowCreateNotif(true);
    }
  };

  // Modifiez la fonction renderBottomSheetContent pour afficher différentes étapes
  const renderBottomSheetContent = () => {
    if (isCreatingMode) {
      if (formStep === 1) {
        // Première étape: formulaire de création d'événement
        return (
          <ScrollView>
            <H4>Créer un événement</H4>
            <Form form={form} onSubmit={onSubmitStep1}>
              <YStack gap={12} marginTop={24}>
                <InputGenerator
                  configs={EVENT_INPUT_CONFIGS}
                  control={control}
                  defaultValues={form.getValues()}
                />
                <Button
                  size="lg"
                  onPress={form.handleSubmit(onSubmitStep1)}
                  disabled={isCreatingEventPending}
                >
                  {isCreatingEventPending ? 'Création...' : 'Suivant'}
                </Button>
                <Button variant="outline" size="lg" onPress={handleCancel}>
                  Annuler
                </Button>
              </YStack>
            </Form>
          </ScrollView>
        );
      } else {
        // Deuxième étape: upload d'image
        return (
          <ScrollView>
            <H4>Ajouter une image</H4>
            <YStack gap={12} marginTop={24}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.previewImage}
                  contentFit="cover"
                />
              ) : (
                <View style={styles.imagePlaceholder} alignItems="center" justifyContent="center">
                  <Text color="$gray10">Aucune image sélectionnée</Text>
                </View>
              )}

              <Button size="lg" onPress={pickImage} marginTop={12}>
                {selectedImage ? "Changer l'image" : 'Sélectionner une image'}
              </Button>

              <XStack gap={12} marginTop={12}>
                <Button variant="outline" size="lg" onPress={handleCancel} flex={1}>
                  Retour
                </Button>
                <Button
                  size="lg"
                  onPress={onSubmitStep2}
                  disabled={!selectedImage || isUploadingPending}
                  flex={1}
                >
                  {isUploadingPending ? 'Envoi...' : 'Terminer'}
                </Button>
              </XStack>
            </YStack>
          </ScrollView>
        );
      }
    }

    return selectedEvent ? (
      <EventDetails event={selectedEvent} />
    ) : (
      <ScrollView
        scrollEnabled={currentSnapIndex !== 1}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onSubmit={handleSearchSubmit}
        />
        <View marginTop="$6" gap="$6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              image={event.image || ''}
              title={event.name}
              address={`${event.address.street}, ${event.address.city}`}
              datetime={event.start_date}
              onPress={() => handleEventCardPress(event)}
            />
          ))}
        </View>
      </ScrollView>
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
                events={filteredEvents}
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
          title={selectedEvent?.name}
          bottomSheetRef={bottomSheetRef}
          onChange={onBottomSheetChange}
          snapPoints={['5%', '25%', '50%', '90%']}
          initialIndex={selectedEvent ? 2 : 1}
          onClose={handleClose}
          showCloseButton={!!selectedEvent}
          onCreateModeChange={setIsCreatingMode}
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
  scrollContent: {
    flexGrow: 1,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '$gray3',
    borderRadius: 8,
  },
});
