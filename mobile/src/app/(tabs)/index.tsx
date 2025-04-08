import { H1, H2, H3, H4, H5, H6 } from '@/components/atoms/typography/heading';
import { Text } from '@/components/atoms/typography/text';
import { Input } from '@/components/atoms/inputs/input';
import { View, YStack } from 'tamagui';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log('API URL:', apiUrl);

  return (
    <View flex={1} backgroundColor="$background" padding="$4" gap="$4">
       <Input
          placeholder="Rechercher"
          variant="outline"
          size="lg"
          icon={<FontAwesome name="search" size={18} color="#aaa" />}
        />

      <YStack space="$4">
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
        <H5>Heading 5</H5>
        <H6>Heading 6</H6>

        <YStack space="$2">
          <Text size="xl" weight="bold">
            Extra Large Text
          </Text>
          <Text size="lg" weight="semibold">
            Large Text
          </Text>
          <Text size="base" weight="medium">
            Base Text
          </Text>
          <Text>Default Text (14px - semibold)</Text>
          <Text size="sm" weight="normal">
            Small Text
          </Text>
          <Text size="xs" weight="normal">
            Extra Small Text
          </Text>
        </YStack>
      </YStack>
    </View>
  );
}
