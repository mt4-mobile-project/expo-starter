import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '@/services/upload';
import { FileType } from '@/types/files';

export const useFileUpload = () => {
  return useMutation({
    mutationFn: ({
      uri,
      filableId,
      filableType,
    }: {
      uri: string;
      filableId: number;
      filableType: FileType;
    }) => uploadFile(uri, filableId, filableType),
    onSuccess: (response) => {
      console.log('Fichier uploadé avec succès:', response);
    },
    onError: (error) => {
      console.error("Erreur lors de l'upload du fichier:", error);
    },
  });
};
