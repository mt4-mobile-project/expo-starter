import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProfile } from '@/services/profile';
import { CreateProfileData, ProfileResponse } from '@/types/profile';
import { router } from 'expo-router';
import { useFileUpload } from '@/hooks/files/useFileUpload';
import { FileType } from '@/types/files';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const { mutate: uploadImage } = useFileUpload();
  const [tempImage, setTempImage] = useState<string | null>(null);

  const createProfileMutation = useMutation<ProfileResponse, Error, CreateProfileData>({
    mutationFn: createProfile,
    onSuccess: async (data) => {
      console.log('✅ Profil créé avec succès:', data);

      // Si une image temporaire existe, on l'upload
      if (tempImage) {
        try {
          uploadImage(
            {
              uri: tempImage,
              filableId: data.id,
              filableType: FileType.Profile,
            },
            {
              onSuccess: () => {
                console.log('✅ Image uploadée avec succès');
                queryClient.invalidateQueries({ queryKey: ['profile'] });
                router.replace('/(tabs)');
              },
            }
          );
        } catch (error) {
          console.error('❌ Erreur upload image:', error);
          router.replace('/(tabs)');
        }
      } else {
        router.replace('/(tabs)');
      }
    },
    onError: (error) => {
      console.error('❌ Erreur création profil:', error);
    },
  });

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setTempImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('❌ Erreur sélection image:', error);
    }
  };

  return {
    createProfile: createProfileMutation.mutate,
    isLoading: createProfileMutation.isPending,
    pickImage,
    tempImage,
  };
};
