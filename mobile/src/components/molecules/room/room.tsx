// src/components/molecules/conversation-card/Room.tsx
import { XStack, YStack, Text, styled } from 'tamagui';
import { Image } from 'react-native';

interface RoomProps {
  imageUrl: string;
  name: string;
  lastMessage: string;
  lastMessageDate: string;
}

const StyledImage = styled(Image, {
  width: 60,
  height: 60,
  borderRadius: 30,
});

export const Room = ({
  imageUrl,
  name,
  lastMessage,
  lastMessageDate,
}: RoomProps) => {
  return (
    <XStack
      padding="$3"
      borderBottomWidth={1}
      borderColor="#333"
      alignItems="center"
      backgroundColor="#1c1c1e"
    >
      <StyledImage source={{ uri: imageUrl }} />

      <YStack marginLeft="$3" justifyContent="center" flex={1}>
        <Text fontWeight="600" fontSize={16} color="white">
          {name}
        </Text>
        <Text fontSize={14} color="#aaa" numberOfLines={1}>
          {lastMessage}
        </Text>
      </YStack>

      <Text fontSize={12} color="#666" marginLeft="$2">
        {lastMessageDate}
      </Text>
    </XStack>
  );
};
