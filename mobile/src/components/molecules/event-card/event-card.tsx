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
    <YStack overflow="hidden" width="100%" maxWidth={400} onPress={onPress}>
      <StyledImage source={imageSource} resizeMode="cover" />
      <YStack padding="$4">
        <Text fontWeight="700" fontSize={18} color="#000">
          {title}
        </Text>
        <Text fontSize={14} color="#444" marginTop="$1">
          {address}
        </Text>
        <Text fontSize={13} color="#666" marginTop="$1">
          {datetime}
        </Text>
      </YStack>
    </YStack>
  );
};
