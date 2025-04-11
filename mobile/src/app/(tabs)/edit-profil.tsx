import { useEffect, useState } from 'react';
import { View, YStack, XStack } from 'tamagui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/atoms/form/form';
import { Text } from '@/components/atoms/typography/text';
import { InputGenerator } from '@/utils/generator/input-generator';
import { PROFILE_INPUT_CONFIGS } from '@/configs/inputs/profile-input.config';
import { Button } from '@/components/atoms/buttons/button';
import { useEditProfile } from '@/hooks/profile/useEditProfile';
import ProfileCard from '@/components/molecules/cards/profil-card';
import * as ImagePicker from 'expo-image-picker';
import ProfileImage from '@/components/atoms/profile-cards/profil-image';
import { LogoutButton } from '@/components/atoms/buttons/logout-button';

const profileSchema = z.object({
  fullName: z.string().min(2).max(24),
  description: z.string().min(5).max(200),
  instruments: z.string().min(2).max(50),
  influences: z.string().min(2).max(50),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function EditProfileScreen() {
  const [profileName, setProfileName] = useState('Nom de profil');
  const { profile, isFetching, editProfile, isUpdating, pickImage } = useEditProfile();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      description: '',
      instruments: '',
      influences: '',
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile.username,
        description: profile.description,
        instruments: profile.instrument_played,
        influences: profile.musical_influence,
      });
      setProfileName(profile.username);
    }
  }, [profile, form]);

  const onSubmit = (data: ProfileFormData) => {
    editProfile({
      username: data.fullName,
      description: data.description,
      instrument_played: data.instruments,
      musical_influence: data.influences,
    });
  };

  if (isFetching) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>Chargement...</Text>
      </View>
    );
  }

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
          <ProfileImage
            source={profile?.image_url || 'https://picsum.photos/200'}
            onPress={pickImage}
          />
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
              size="lg"
              onPress={form.handleSubmit(onSubmit)}
              disabled={isUpdating}
            >
              <Text>Modifier</Text>
            </Button>
          </XStack>
        </YStack>
      </Form>
      <LogoutButton />
    </View>
  );
}
