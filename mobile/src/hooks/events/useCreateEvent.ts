import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent, CreateEventDTO } from '@/services/events';
import { Event } from '@/types/events';

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventDTO) => createEvent(data),
    onSuccess: (response: Event) => {
      // Log de la réponse complète
      console.log('Événement créé avec succès:', response);

      // Invalidate events query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};
