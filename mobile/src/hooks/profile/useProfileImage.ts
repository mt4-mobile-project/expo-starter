import { useState, useEffect } from 'react';
import { getFileImage, uploadImage } from '@/services/files';
import { FileType } from '@/types/files';

export const useProfileImage = (profileId: number) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getFileImage(FileType.Profile, profileId);
        setImageUrl(`data:image/jpeg;base64,${url}`);
      } catch (error) {
        console.error('Failed to fetch profile image:', error);
      }
    };

    if (profileId) {
      fetchImage();
    }
  }, [profileId]);

  const uploadProfileImage = async (file: File) => {
    setIsUploading(true);
    try {
      await uploadImage({
        file,
        filable_type: FileType.Profile,
        filable_id: profileId,
      });
      const url = await getFileImage(FileType.Profile, profileId);
      setImageUrl(`data:image/jpeg;base64,${url}`);
    } catch (error) {
      console.error('Failed to upload profile image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return { imageUrl, isUploading, uploadProfileImage };
};
