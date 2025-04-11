import { ScrollView, Spinner, Text } from 'tamagui';
import { Room as RoomComponent } from '@/components/molecules/room/room';
import { useRoom } from '@/hooks/room/useRoom';
import { Link, router } from 'expo-router';
import { useEffect } from 'react';

export default function MessagesScreen() {
  const { data: rooms, isLoading, isError } = useRoom();

  useEffect(() => {
     console.log("Rooms data:", rooms);
  }, [rooms]);

  if (isLoading) {
    return <Spinner size="large" color="$blue10" marginTop="$10" />;
  }

  if (isError) {
    return <Text color="red">Erreur lors du chargement des messages</Text>;
  }

  return (
    <ScrollView flex={1} backgroundColor="$background" padding="$4">
      {rooms?.length === 0 ? (
      <Text color="#888" textAlign="center" marginTop="$5">
        Pas de conversations pour le moment
      </Text>
        ) : (
          rooms?.map((room) => (
            <Link
            key={room.id}
            href={{
              pathname: '/room/[id]',
              params: { id: room.id },
            }}
            >
            <RoomComponent
              key={room.id}
              imageUrl={room.participant.avatar ?? "https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0="}
              name={room.participant.name}
              lastMessage={room.last_message?.content ?? "Aucun message"}
              lastMessageDate={room.lastMessageDate ?? ""}
              
            />
            </Link>
          ))  
        )}
    </ScrollView>
  );
}
