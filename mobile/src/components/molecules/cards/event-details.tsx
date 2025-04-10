import { YStack } from 'tamagui';
import { Text } from '@/components/atoms/typography/text';
import { Event } from '@/types/events';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

interface EventDetailsProps {
  event: Event;
}

export const EventDetailsCard = ({ event }: EventDetailsProps) => {
  const imageUrl = event.image
    ? `data:image/jpeg;base64,${event.image}`
    : require('@/assets/images/placeholder.png');

  return (
    <YStack space="$4">
      <Image
        style={styles.image}
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
        contentFit="cover"
      />
      <Text size="base">{event.description}</Text>
      <Text size="lg" weight="bold">
        Adresse
      </Text>
      <Text size="base">{event.address.street}</Text>
      <Text size="base">{event.address.city}</Text>
      <Text size="lg" weight="bold">
        Date
      </Text>
      <Text size="base">Du: {new Date(event.start_date).toLocaleDateString()}</Text>
      <Text size="base">Au: {new Date(event.end_date).toLocaleDateString()}</Text>
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
