import { useLocalSearchParams } from 'expo-router';
import { View, Paragraph } from 'tamagui';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/context/socket';
import { asyncStorageToken } from '@/utils/asyncStorageToken';
import Message from '@/components/molecules/messages/message';

export default function RoomScreen() {
  const { id } = useLocalSearchParams();
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<any>([]);
  const [sender, setSender] = useState<any>(null);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('fr-FR', options);
  }

  useEffect(() => {
    if (!socket) return;

    const subscribeToRoom = async () => {
      const token = await asyncStorageToken.get();

      if (!token) return;

      const base64Payload = token?.split('.')[1]; // partie 2 du token
      const payload = JSON.parse(atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/')));
      
      setSender(payload.sub);

      socket.subscribe(
        `/topic/room.${id}`,
        (message) => {
          console.log('message', message.body)
          setMessages((prev: any) => [...prev, JSON.parse(message.body)]);
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
      width={"100%"}
      gap="$4"
    >
      <Paragraph>Room n° {id}</Paragraph>

      {messages.length > 0 ? (
        messages.map((message: any) => (
          <Message
            key={message.id}
            id={message.id}
            content={message.content}
            date={formatDate(message.created_at)}
            whoAreYou={sender === message.username ? 'sender' : 'receiver'}
          />
        ))
      ) : (
        <Paragraph>y a pas de messages ici</Paragraph>
      )}
    </View>
  );
}
