import { ScrollView, StyleSheet } from 'react-native';
import { H4 } from '@/components/atoms/typography/heading';
import { YStack, XStack, View } from 'tamagui';
import { Button } from '@/components/atoms/buttons/button';
import { Form } from '@/components/atoms/form/form';
import { InputGenerator } from '@/utils/generator/input-generator';
import { EVENT_INPUT_CONFIGS } from '@/configs/inputs/event-input.config';
import { Text } from '@/components/atoms/typography/text';
import { Image } from 'expo-image';
import { useEventCreationStore } from '@/stores/events/event-creation-store';
import { useEventForm } from '@/hooks/events/useEventForm';

interface EventCreationFormProps {
  bottomSheetRef: any;
}

export const EventCreationForm = ({ bottomSheetRef }: EventCreationFormProps) => {
  const { formStep, selectedImage } = useEventCreationStore();

  const {
    form,
    control,
    isCreatingEventPending,
    isUploadingPending,
    pickImage,
    onSubmitStep1,
    onSubmitStep2,
    handleCancel,
  } = useEventForm(bottomSheetRef);

  if (formStep === 1) {
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}>
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
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <H4>Ajouter une image</H4>
        <YStack gap={12} marginTop={24}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.previewImage} contentFit="cover" />
          ) : (
            <View
              width="100%"
              height={200}
              backgroundColor="$muted"
              borderRadius={8}
              borderWidth={1}
              borderColor="$border"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="$gray10">Aucune image sélectionnée</Text>
            </View>
          )}

          <Button variant="outline" size="lg" onPress={pickImage} marginTop={12}>
            {selectedImage ? "Changer l'image" : 'Sélectionner une image'}
          </Button>

          <XStack gap={12} marginTop={4}>
            {/* <Button variant="outline" size="lg" onPress={handleCancel} flex={1}>
              Retour
            </Button> */}
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
};

const styles = StyleSheet.create({
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '$muted',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '$border',
  },
});
