import { View, Text, Button } from 'tamagui';

export default function HomeScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log('API URL:', apiUrl);

  return (
    <View>
      <Text>Heh</Text>
      <Button>Click me</Button>
    </View>
  );
}
