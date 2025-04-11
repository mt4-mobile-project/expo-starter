import { useQuery } from "@tanstack/react-query";
import { getRooms } from "@/services/room";
import { formatMessageDate } from "@/utils/location"; // Importer la fonction de formatage

export const useRoom = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const rooms = await getRooms();

      // Formater les dates des messages dans les rooms
      return rooms.map(room => ({
        ...room,
        lastMessageDate: room.last_message?.sent_at
          ? formatMessageDate(room.last_message.sent_at) 
          : "", // Si pas de message, retourner une chaîne vide
      }));
    },
  });
};
