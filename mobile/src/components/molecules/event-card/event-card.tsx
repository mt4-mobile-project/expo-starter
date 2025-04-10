// src/components/molecules/event-card/EventCard.tsx
import { YStack, Text, styled } from 'tamagui';
import { Image } from 'react-native';

interface EventCardProps {
  image: string;
  title: string;
  address: string;
  datetime: string;
  onPress?: () => void; // Add this line
}

const StyledImage = styled(Image, {
  width: '100%',
  height: 200, // Hauteur fixe
  borderRadius: 8,
});

export const EventCard = ({ image, title, address, datetime, onPress }: EventCardProps) => {
  const imageSource = image
    ? { uri: `data:image/jpeg;base64,${image}` }
    : { uri: Image.resolveAssetSource(require('@/assets/images/placeholder.png')).uri };

  return (
    <YStack overflow="hidden" width="100%" maxWidth={400} gap="$3" onPress={onPress}>
      <StyledImage source={imageSource} resizeMode="cover" />
      <YStack gap="$1">
        <Text fontWeight="700" fontSize={18} color="$cardForeground">
          {title}
        </Text>
        <YStack>
          <Text fontSize={14} color="#cardForeground" opacity={0.6} marginTop="$1">
            {address}
          </Text>
          <Text fontSize={13} color="#cardForeground" opacity={0.6} marginTop="$1">
            {datetime}
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
};
