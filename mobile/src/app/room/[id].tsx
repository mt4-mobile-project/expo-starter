import { useLocalSearchParams } from 'expo-router';
import { View, Paragraph } from 'tamagui';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/context/socket';
import { asyncStorageToken } from '@/utils/asyncStorageToken';

export default function RoomScreen() {
  const { id } = useLocalSearchParams();
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<any>([]);
  useEffect(() => {
    if (!socket) return;

    const subscribeToRoom = async () => {
      const token = await asyncStorageToken.get();

      socket.subscribe(
        `/topic/room.${id}`,
        (message) => {
          setMessages((prev: any) => [...prev, JSON.stringify(message)]);
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
    };

    subscribeToRoom();
  }, [id, socket]);

  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap="$4"
    >
      <Paragraph>Room n° {id}</Paragraph>
      <Paragraph>
        {messages.length > 0 ? JSON.stringify(messages) : 'y a pas de messages ici'}
      </Paragraph>
    </View>
  );
}
