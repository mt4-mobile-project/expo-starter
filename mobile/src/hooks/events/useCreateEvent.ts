import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent, CreateEventDTO } from '@/services/events';

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventDTO) => createEvent(data),
    onSuccess: () => {
      // Invalidate events query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};
