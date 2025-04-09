// src/components/molecules/event-card/EventCard.tsx
import { YStack, Text, styled } from 'tamagui';
import { Image } from 'react-native';

interface EventCardProps {
  imageUrl: string;
  title: string;
  address: string;
  datetime: string;
}

const StyledImage = styled(Image, {
  width: '100%',
  height: 200,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
});

export const EventCard = ({ imageUrl, title, address, datetime }: EventCardProps) => {
  return (
    <YStack
      borderRadius={12}
      overflow="hidden"
      background="white"
      shadowColor="#000"
      shadowOpacity={0.1}
      shadowRadius={10}
      width="100%"
      maxWidth={400}
      marginBottom="$6"
      borderColor="#333"
    >
      <StyledImage source={{ uri: imageUrl }} resizeMode="cover" />
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
