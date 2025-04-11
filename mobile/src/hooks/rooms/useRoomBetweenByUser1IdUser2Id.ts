import { useMutation } from '@tanstack/react-query';
import { getRoomBetweenByUser1IdUser2Id } from "@/services/rooms";

export const useRoomBetweenByUser1IdUser2Id = () => {
  return useMutation({
    mutationFn: (user1Id: number, user2Id: number) => getRoomBetweenByUser1IdUser2Id(user1Id, user2Id),
  });
};