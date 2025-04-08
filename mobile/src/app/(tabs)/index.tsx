import { Button } from '@/components/atoms/button';
import { View, Text } from 'tamagui';

export default function HomeScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log('API URL:', apiUrl);

  return (
    <View>
      <Text>Heh</Text>
      <Button>Click me</Button>
      <Button variant="secondary">Click me</Button>
      <Button variant="outline">Click me</Button>
    </View>
  );
}
