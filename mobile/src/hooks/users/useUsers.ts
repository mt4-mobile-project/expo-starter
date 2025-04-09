// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/user';

export const useUsers = (searchTerm: string) => {
  return useQuery({
    queryKey: ['users', searchTerm],
    queryFn: () => getUsers(searchTerm),
  });
};
