import { FileType } from '@/types/files';
import { api } from '@/utils/api';

export const getFileImage = async (fileType: FileType, fileId: number): Promise<string> => {
  try {
    const response = await api.get<ArrayBuffer>(`/files/${fileType}/${fileId}`, {
      headers: {
        Accept: 'image/*',
      },
      responseType: 'arraybuffer',
    });

    // Convert ArrayBuffer to base64
    const bytes = new Uint8Array(response);
    let binary = '';
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return btoa(binary);
  } catch (error) {
    console.warn(`Failed to fetch image for ${fileType} ${fileId}:`, error);
    return '';
  }
};

export interface UploadImageData {
  file: File;
  filable_type: string;
  filable_id: number;
}

export const uploadImage = async (data: UploadImageData): Promise<void> => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('filable_type', data.filable_type);
  formData.append('filable_id', data.filable_id.toString());

  await api.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
