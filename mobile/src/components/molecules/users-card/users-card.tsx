// src/components/molecules/user-card/UserCard.tsx
import { View, XStack, YStack, Text, styled } from 'tamagui';
import { Image } from 'react-native';

interface UserCardProps {
  imageUrl: string;
  name: string;
  region: string;
  status?: string;
}

const StyledImage = styled(Image, {
  width: 60,
  height: 60,
  borderRadius: 30,
});

export const UserCard = ({ imageUrl, name, region, status = "Statut sur l'app" }: UserCardProps) => {
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
        <Text fontSize={14} color="#aaa">
          {region}
        </Text>
        <Text fontSize={12} color="#666">
          {status}
        </Text>
      </YStack>
    </XStack>
  );
};
