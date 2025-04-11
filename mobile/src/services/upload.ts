import { FileType } from '@/types/files';
import { api } from '@/utils/api';
import * as FileSystem from 'expo-file-system';
import { asyncStorageToken } from '@/utils/asyncStorageToken';

interface UploadResponse {
  id: number;
  filable_id: number;
  filable_type: string;
  file_path: string;
  created_at: string;
  updated_at: string;
}

/**
 * Télécharge un fichier image vers le serveur
 * @param uri URI du fichier local à télécharger
 * @param filableId ID de l'objet associé (event, profile, etc.)
 * @param filableType Type de l'objet associé
 * @returns Réponse du serveur avec les informations du fichier téléchargé
 */
export const uploadFile = async (
  uri: string,
  filableId: number,
  filableType: FileType
): Promise<UploadResponse> => {
  try {
    // Vérifier que l'URI existe
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw new Error("Le fichier n'existe pas");
    }

    // Utiliser FileSystem.uploadAsync pour un upload multipart plus fiable
    const formData = new FormData();
    const fileName = uri.split('/').pop() || 'image.jpg';

    // Créer un objet blob pour le fichier
    const fileType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';
    const file = {
      uri: uri,
      name: fileName,
      type: fileType,
    } as any;

    // Ajouter les champs au FormData
    formData.append('file', file);
    formData.append('filable_id', filableId.toString());
    formData.append('filable_type', filableType); // Envoyer directement l'enum sans toString()

    console.log('Envoi du fichier:', {
      uri,
      filableId,
      filableType, // Log sans toString() pour voir la valeur réelle
    });

    // Utiliser directement fetch pour plus de contrôle sur la requête
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://172.20.10.1:8080';

    // Récupérer le token d'authentification
    const token = await asyncStorageToken.get();

    // Préparer les headers avec le token si disponible
    const headers: HeadersInit = {
      Accept: 'application/json',
      // Ne pas définir Content-Type, il sera automatiquement défini avec la boundary
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${apiUrl}/files/upload`, {
      method: 'POST',
      body: formData,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur serveur: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log('Fichier téléchargé avec succès:', responseData);
    return responseData;
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
    throw error;
  }
};

/**
 * Supprime un fichier du serveur
 * @param fileId ID du fichier à supprimer
 * @returns Réponse du serveur
 */
export const deleteFile = async (fileId: number): Promise<any> => {
  try {
    const response = await api.delete(`/files/${fileId}`);
    console.log('Fichier supprimé avec succès:', response);
    return response;
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier:', error);
    throw error;
  }
};
