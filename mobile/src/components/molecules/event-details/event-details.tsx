import { YStack } from 'tamagui';
import { Text } from '@/components/atoms/typography/text';
import { Event } from '@/types/events';

interface EventDetailsProps {
  event: Event;
}

export const EventDetails = ({ event }: EventDetailsProps) => {
  return (
    <YStack space="$4" padding="$4">
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
