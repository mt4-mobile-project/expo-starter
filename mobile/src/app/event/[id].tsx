import { useLocalSearchParams } from 'expo-router';
import { View, Paragraph } from 'tamagui';

export default function EventScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap="$4"
    >
      <Paragraph>Event n° {id}</Paragraph>
    </View>
  );
}
