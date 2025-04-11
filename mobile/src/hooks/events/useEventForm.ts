import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { useCreateEvent } from './useCreateEvent';
import { useFileUpload } from '@/hooks/files/useFileUpload';
import { FileType } from '@/types/files';
import { useEventCreationStore } from '@/stores/events/event-creation-store';
import { useEvents } from './useEvents';
import { useCreationModeStore } from '@/stores/creation-mode-store';
import { useJoinEvent } from './useJoinEvent';

interface EventFormData {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  street: string;
  city: string;
}

export const useEventForm = (bottomSheetRef: any) => {
  const {
    newMarkerLocation,
    formStep,
    selectedImage,
    createdEventId,
    setFormStep,
    setSelectedImage,
    setCreatedEventId,
    resetCreationState,
  } = useEventCreationStore();

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

  const { mutate: createEvent, isPending: isCreatingEventPending } = useCreateEvent();
  const { mutate: uploadImage, isPending: isUploadingPending } = useFileUpload();
  const { refetch } = useEvents();
  const { mutate: joinEvent } = useJoinEvent();

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
          setCreatedEventId(response.id);
          setFormStep(2);

          // Rejoindre automatiquement la room
          joinEvent(response.id);
        },
      }
    );
  };

  const onSubmitStep2 = () => {
    if (!selectedImage || !createdEventId) return;

    uploadImage(
      {
        uri: selectedImage,
        filableId: createdEventId,
        filableType: FileType.Event,
      },
      {
        onSuccess: () => {
          form.reset();
          resetCreationState();
          bottomSheetRef.current?.snapToIndex(1);
          refetch();

          // Reset creation mode
          useCreationModeStore.getState().setIsCreating(false);
        },
        onError: (error: unknown) => {
          console.error("Erreur lors de l'upload de l'image:", error);
        },
      }
    );
  };

  const handleCancel = () => {
    if (formStep === 2) {
      setFormStep(1);
    } else {
      form.reset();
      resetCreationState();
      bottomSheetRef.current?.snapToIndex(1);

      // Reset creation mode
      useCreationModeStore.getState().setIsCreating(false);
    }
  };

  return {
    form,
    control: form.control,
    isCreatingEventPending,
    isUploadingPending,
    pickImage,
    onSubmitStep1,
    onSubmitStep2,
    handleCancel,
  };
};
