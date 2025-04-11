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

    // Convertir ArrayBuffer en base64
    const bytes = new Uint8Array(response);
    let binary = '';
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    const base64 = btoa(binary);

    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.warn(`Failed to fetch image for ${fileType} ${fileId}:`, error);
    return '';
  }
};

export const deleteFileImage = async (fileType: FileType, fileId: number): Promise<void> => {
  try {
    await api.delete(`/files/${fileType}/${fileId}`);
    console.log('Image supprimée avec succès');
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image:", error);
    throw error;
  }
};
