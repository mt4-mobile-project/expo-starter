import { useQuery } from '@tanstack/react-query';
import { getMessagesRoom } from '@/services/message';
import type { MessagesRoom } from '@/types/message';

export const useMessagesRoom = (id: number) => {
    return useQuery<MessagesRoom[]>({
        queryKey: [`messagesRoom-${id}`],
        queryFn: async () => {
            return await getMessagesRoom(id);
        }
    })
}
