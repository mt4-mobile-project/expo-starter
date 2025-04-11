import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile, editProfile as editProfileService } from '@/services/profile';
import { ProfileResponse } from '@/types/profile';
import { useFileUpload } from '@/hooks/files/useFileUpload';
import { FileType } from '@/types/files';
import * as ImagePicker from 'expo-image-picker';
import { getFileImage, deleteFileImage } from '@/services/files';

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const { mutate: uploadImage } = useFileUpload();

  const {
    data: profile,
    isPending: isFetching,
    refetch,
  } = useQuery<ProfileResponse>({
    queryKey: ['profile'],
    queryFn: async () => {
      const profileData = await getProfile();
      if (profileData.id) {
        const imageUrl = await getFileImage(FileType.Profile, profileData.id);
        return {
          ...profileData,
          image_url: imageUrl,
        };
      }
      return profileData;
    },
  });

  const editProfileMutation = useMutation({
    mutationFn: (data: Partial<ProfileResponse>) => editProfileService(profile?.id || 0, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
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
        try {
          await deleteFileImage(FileType.Profile, profile?.id || 0);

          // Upload la nouvelle image
          uploadImage(
            {
              uri: result.assets[0].uri,
              filableId: profile?.id || 0,
              filableType: FileType.Profile,
            },
            {
              onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['profile'] });
                await refetch();
              },
            }
          );
        } catch (error) {
          console.error("Erreur lors de la gestion de l'image:", error);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
    }
  };

  return {
    profile,
    isFetching,
    editProfile: editProfileMutation.mutate,
    isUpdating: editProfileMutation.isPending,
    pickImage,
  };
};
