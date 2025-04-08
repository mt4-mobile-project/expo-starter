import { H1, H2, H3, H4, H5, H6 } from '@/components/atoms/typography/heading';
import { Text } from '@/components/atoms/typography/text';
import { Input } from '@/components/atoms/inputs/input';
import { View, YStack } from 'tamagui';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect } from 'react';
import { login } from '@/services/auth';
import { getCurrentUser } from '@/services/user';
import { useUsers } from '@/hooks/useUsers';
import { UserCard } from '@/components/molecules/users-card/users-card';


export default function HomeScreen() {

  const { data: users, isLoading, error } = useUsers();

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const credentials = {
          username: 'string',
          password: 'string',
        };

        const response = await login(credentials);
        console.log('Logged in successfully', response);
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    tryLogin();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log('Current user:', user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View flex={1} backgroundColor="$background" padding="$4" gap="$4">
       <Input
          placeholder="Rechercher"
          variant="outline"
          size="lg"
          icon={<FontAwesome name="search" size={18} color="#aaa" />}
        />

      {isLoading && <Text>Chargement des utilisateurs...</Text>}
      {error && <Text>Erreur lors du chargement.</Text>}

      {users?.map((user) => (
        <UserCard
          key={user.id}
          imageUrl="https://picsum.photos/200"
          name={user.username}
          region="France"
          status="En ligne"
        />
      ))}
     
    </View>
  );
}

