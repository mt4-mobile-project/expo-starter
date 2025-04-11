import { useQuery } from "@tanstack/react-query";
import { getRooms } from "@/services/rooms";

export const useRoom = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
};