import { Link } from 'expo-router';
import { View, YStack } from 'tamagui';

export default function ShowcaseScreen() {
  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
    >
      <YStack space="$4" alignItems="center">
        <Link href="/showcase/typography">Typo Showcase</Link>

        <Link href="/showcase/button">Button Showcase</Link>

        <Link href="/showcase/input">Input Showcase</Link>

        <Link href="/showcase/form">Form page</Link>

        <Link href="/showcase/profile-cards">Profile Cards Showcase</Link>

        <Link href="/showcase/login">Login Showcase</Link>

        <Link href="/showcase/map">Map Showcase</Link>
      </YStack>
    </View>
  );
}
