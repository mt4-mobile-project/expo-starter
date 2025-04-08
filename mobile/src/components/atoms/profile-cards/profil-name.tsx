import { Text } from 'tamagui';

export default function ProfileName({ name }: { name: string }) {
  return (
    <Text fontSize={16} fontWeight="bold" color="white">
      {name}
    </Text>
  );
}
