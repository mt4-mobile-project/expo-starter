import { View, YStack, XStack } from 'tamagui';
import ProfileCard from '@/components/molecules/profile-card/profil-card';
import { InputGenerator } from '@/utils/generator/input-generator';
import { PROFILE_INPUT_CONFIGS } from '@/configs/inputs/profile-input.config';
import { Button } from '@/components/atoms/buttons/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/molecules/form/form';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(1, 'Le téléphone est requis'),
  address: z.string().min(1, "L'adresse est requise"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilScreen() {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: ''
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      console.log('Profile data submitted:', data);
      // Ajoutez ici votre logique de soumission
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleCancel = () => {
    form.reset();
    console.log('Action annulée');
  };

  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap={'$20'}
    >
      <ProfileCard />


      <Form form={form} onSubmit={onSubmit}>
        <YStack space="$4" width="100%">
        <InputGenerator<ProfileFormData>
        configs={PROFILE_INPUT_CONFIGS}
        control={form.control}
        defaultValues={form.getValues()}
      />
          
          <XStack space="$2">
            <Button
              variant="outline"
              flex={1}
              onPress={handleCancel}
            >
              Annuler
            </Button>
            <Button
              variant="default"
              flex={1}
              onPress={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
            >
              Valider
            </Button>
          </XStack>
        </YStack>
      </Form>
    </View>
  );
}
