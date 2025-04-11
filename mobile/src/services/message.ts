import { api } from '@/utils/api';
import { MessagesRoom } from "@/types/message"

export const getMessagesRoom = async (
    id: number
): Promise<MessagesRoom[]> => {
    return await api.get<MessagesRoom[]>(`/messages/room/${id}`);
}
