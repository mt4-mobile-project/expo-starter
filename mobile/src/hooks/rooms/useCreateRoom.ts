import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoom } from '@/services/rooms';

interface CreateRoomData {
  user2_id: number;
}

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateRoomData) => createRoom(data),
    onSuccess: () => {
      // Invalider les requêtes liées aux rooms pour les recharger
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};