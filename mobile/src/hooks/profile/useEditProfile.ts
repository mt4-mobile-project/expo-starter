import { useMutation, useQuery } from '@tanstack/react-query';
import { getProfile, editProfile } from '@/services/profile';
import { ProfileResponse } from '@/types/profile';

export const useEditProfile = () => {
  const { data: profile, isPending : isFetching } = useQuery<ProfileResponse>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const editProfileMutation = useMutation({
    mutationFn: (data: Partial<ProfileResponse>) => editProfile(profile?.id || 0, data),
    onSuccess: () => {
      console.log('Profile updated successfully');
    },
    onError: (error: any) => {
      console.error('Profile update failed:', error);
    },
  });

  return {
    profile,
    isFetching,
    editProfile: editProfileMutation.mutate,
    isUpdating: editProfileMutation.isPending,
  };
};
