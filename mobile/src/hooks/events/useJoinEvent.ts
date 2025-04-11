import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinEvent } from '@/services/events';
import { Alert } from 'react-native';

export const useJoinEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => joinEvent(eventId),
    onSuccess: (response) => {
      // Afficher un message de succès
      Alert.alert('Information', "Vous avez rejoint l'événement avec succès");

      // Invalider les requêtes pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['joinedEvents'] });
    },
    onError: (error: any) => {
      console.error("Erreur lors de la participation à l'événement:", error);
      Alert.alert(
        'Erreur',
        error.data?.message || "Impossible de rejoindre l'événement. Veuillez réessayer plus tard."
      );
    },
  });
};
