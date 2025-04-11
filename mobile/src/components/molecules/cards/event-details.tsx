import { YStack } from 'tamagui';
import { Text } from '@/components/atoms/typography/text';
import { Event } from '@/types/events';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { H5 } from '@/components/atoms/typography/heading';
import { Button } from '@/components/atoms/buttons/button';
import { useJoinEvent } from '@/hooks/events/useJoinEvent';
import { useState, useEffect } from 'react';
import { useSegments } from 'expo-router';

interface EventDetailsProps {
  event: Event;
  isJoined?: boolean;
}

export const EventDetailsCard = ({ event, isJoined = false }: EventDetailsProps) => {
  const segments = useSegments();
  const isEventsPage = segments[segments.length - 1] === 'events';

  const imageUrl = event.image
    ? `data:image/jpeg;base64,${event.image}`
    : require('@/assets/images/placeholder.png');

  const [localIsJoined, setLocalIsJoined] = useState(isJoined);
  const { mutate: joinEvent, isPending } = useJoinEvent();

  useEffect(() => {
    setLocalIsJoined(isJoined);
  }, [isJoined]);

  const handleJoinEvent = () => {
    joinEvent(event.id, {
      onSuccess: () => {
        setLocalIsJoined(true);
      },
    });
  };

  return (
    <YStack space="$4" margin={16}>
      <YStack gap="$1">
        <H5 color="$cardForeground">{event.name}</H5>
        <YStack>
          <Text fontSize={14} color="$cardForeground" opacity={0.6} marginTop="$1">
            {event.address.street}, {event.address.city}
          </Text>
          <Text fontSize={14} color="$cardForeground" opacity={0.6} marginTop="$1">
            {new Date(event.start_date).toLocaleDateString()}
            {' - '}
            {new Date(event.end_date).toLocaleDateString()}
          </Text>
        </YStack>
      </YStack>
      {!isEventsPage && (
        <Button disabled={localIsJoined || isPending} onPress={handleJoinEvent}>
          {localIsJoined ? 'Déjà rejoint' : isPending ? 'En cours...' : 'Rejoindre'}
        </Button>
      )}
      <Text fontSize={14} color="$cardForeground" opacity={0.7}>
        {event.description}
      </Text>
      <Image
        style={styles.image}
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
        contentFit="cover"
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
