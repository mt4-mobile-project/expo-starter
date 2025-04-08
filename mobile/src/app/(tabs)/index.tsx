import { Button } from '@/components/atoms/buttons/button';
import { View } from 'tamagui';

export default function HomeScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log('API URL:', apiUrl);

  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap="$4"
    >
      <Button>Click me</Button>
      <Button variant="secondary">Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="link">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="destructive">Click me</Button>
    </View>
  );
}
