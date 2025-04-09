import { Link } from 'expo-router';
import { View, YStack } from 'tamagui';

export default function TemporaryScreen() {
  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
    >
      <YStack space="$4" alignItems="center">
        <Link href="/temporary/typography">Temporary Typo Showcase</Link>

        <Link href="/temporary/button">Temporary Button Showcase</Link>

        <Link href="/temporary/input">Temporary Input Showcase</Link>

        <Link href="/temporary/form">Temporary Form page</Link>
      </YStack>
    </View>
  );
}
