import { useState } from 'react';
import { View, YStack, XStack } from 'tamagui';
import ProfileCard from '@/components/molecules/cards/profil-card';
import { InputGenerator } from '@/utils/generator/input-generator';
import { PROFILE_INPUT_CONFIGS } from '@/configs/inputs/profile-input.config';
import { Button } from '@/components/atoms/buttons/button';
import { z } from 'zod';
import { Text } from '@/components/atoms/typography/text';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/atoms/form/form';
import { CreateProfileData } from '@/types/profile';
import { useCreateProfile } from '@/hooks/profile/useCreateProfile';
import ProfileImage from '@/components/atoms/profile-cards/profil-image';

const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Le nom de profil doit contenir au moins 2 caractères')
    .max(24, 'Le nom de profil ne peut pas dépasser 50 caractères'),
  description: z
    .string()
    .min(5, 'La description doit contenir au moins 5 caractères')
    .max(70, 'La description ne peut pas dépasser 200 caractères'),
  instruments: z
    .string()
    .min(2, 'Les instruments doivent contenir au moins 2 caractères')
    .max(50, 'Les instruments ne peuvent pas dépasser 50 caractères'),
  influences: z
    .string()
    .min(2, 'Les influences doivent contenir au moins 2 caractères')
    .max(50, 'Les influences ne peuvent pas dépasser 50 caractères'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilScreen() {
  const [profileName, setProfileName] = useState('Nom de profil');
  const { createProfile, pickImage, tempImage } = useCreateProfile();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      description: '',
      instruments: '',
      influences: '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const profileData: CreateProfileData = {
        username: data.fullName,
        description: data.description,
        instrument_played: data.instruments,
        musical_influence: data.influences,
      };

      createProfile(profileData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap={'$10'}
    >
      <ProfileCard
        profileName={profileName}
        profileImage={
          <ProfileImage source={tempImage || 'https://picsum.photos/200'} onPress={pickImage} />
        }
      />

      <Form form={form} onSubmit={onSubmit}>
        <YStack space="$4" width="100%" gap={'$8'}>
          <InputGenerator<ProfileFormData>
            configs={PROFILE_INPUT_CONFIGS.map((config) =>
              config.name === 'fullName'
                ? {
                    ...config,
                    onChange: (value: string) => setProfileName(value),
                  }
                : config
            )}
            control={form.control}
            defaultValues={form.getValues()}
          />

          <XStack space="$2">
            <Button
              variant="default"
              flex={1}
              onPress={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
            >
              <Text>Valider</Text>
            </Button>
          </XStack>
        </YStack>
      </Form>
    </View>
  );
}
