import { useState, useEffect } from 'react';
import { Text, View } from 'tamagui';
import { Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getCurrentUser } from '@/services/user';
import { useUsers } from '@/hooks/users/useUsers';
import { Input } from '@/components/atoms/inputs/input';
import { UserCard } from '@/components/molecules/cards/users-card';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/hooks/auth/useAuth';
import { useCreateRoom } from '@/hooks/rooms/useCreateRoom';
import { useRoomBetweenByUser1IdUser2Id } from '@/hooks/rooms/useRoomBetweenByUser1IdUser2Id';

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const { login } = useAuth();
  const router = useRouter();
  const { mutateAsync: createRoomMutation } = useCreateRoom();
  const { mutateAsync: getRoomBetweenByUser1IdUser2Id } = useRoomBetweenByUser1IdUser2Id();

  const { data: users, isLoading, error } = useUsers(submittedSearchTerm);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log('Current user:', user);
        if (user && user.id) {
          setCurrentUserId(user.id);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (users) {
      console.log('users', users);
      console.log('users.length', users.length);
    }
  }, [users]);

  const handleSearchSubmit = () => {
    setSubmittedSearchTerm(searchTerm);
    Keyboard.dismiss();
    console.log('Search submitted:', searchTerm);
  };

  const handleUserCardPress = async (userId: number) => {
    if (!currentUserId) {
      console.error('Current user ID is not available');
      return;
    }

    try {
      const room = await getRoomBetweenByUser1IdUser2Id({currentUserId, userId});
      
      let roomId: string;
      
      if (!room || (Array.isArray(room) && room.length === 0)) {
        console.log('Room does not exist, creating a new one...');
        const newRoom = await createRoomMutation({ user2_id: userId });
        roomId = newRoom.id;
      } else {
        roomId = room.id;
      }
      
      router.push({
        pathname: `/room/${roomId}`,
      });
      
    } catch (error) {
      console.error('Error handling room navigation:', error);
    }
  };

  return (
    <View flex={1} backgroundColor="$background">
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Input
          placeholder="Rechercher"
          variant="outline"
          size="lg"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
          icon={<FontAwesome name="search" size={18} color="#aaa" />}
        />

        {isLoading && <Text>Chargement des utilisateurs...</Text>}
        {error && <Text>Erreur lors du chargement.</Text>}

        {users &&
          users.length > 0 &&
          users.map((user) => (
            <TouchableOpacity key={user.id} onPress={() => handleUserCardPress(user.id)}>
            <UserCard
              imageUrl="https://picsum.photos/200"
              name={user.first_name}
              region="France"
              status="En ligne"
            />
          </TouchableOpacity>
          ))}

        <Link
          href={{
            pathname: '/room/[id]',
            params: { id: 1 },
          }}
        >
          Go To first room
        </Link>
      </ScrollView>
    </View>
  );
}
