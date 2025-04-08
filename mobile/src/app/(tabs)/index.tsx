import { Button } from '@/components/atoms/buttons/button';
import { Input } from '@/components/atoms/inputs/input';
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
      {/*       <Button>Click me</Button>
      <Button variant="secondary" size="lg">
        Click me
      </Button>
      <Button variant="outline">Click me</Button>
      <Button variant="link">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="destructive">Click me</Button> */}

      <Input placeholder="Default input" />
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="filled" placeholder="Filled variant" />
      <Input size="sm" placeholder="Small size" />
      <Input size="lg" placeholder="Large size" />
      <Input disabled placeholder="Disabled input" />
    </View>
  );
}
