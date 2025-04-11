import { api } from "@/utils/api";
import { Room } from "@/types/room";

export const getRooms = async (): Promise<Room[]> => {
  return await api.get<Room[]>("/rooms");
};

export const getRoomBetweenByUser1IdUser2Id = async (
  user1Id: number,
  user2Id: number
): Promise<Room> => {
  return await api.get<Room>(`/rooms/between/${user1Id}/${user2Id}`);
};

export const createRoom = async (data: { user2_id: number }): Promise<Room> => {
  return await api.post<Room>("/rooms", data);
};