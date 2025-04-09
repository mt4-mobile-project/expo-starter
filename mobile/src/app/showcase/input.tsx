import { View, YStack } from 'tamagui';
import { Input } from '@/components/atoms/inputs/input';
import { Text } from '@/components/atoms/typography/text';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

export default function ShowcaseInputScreen() {
  const [value, setValue] = useState('');

  return (
    <View flex={1} backgroundColor="$background" padding="$4">
      <YStack space="$4">
        <Text size="xl" weight="bold">
          Input Variants
        </Text>

        <Input placeholder="Default Input" variant="default" size="md" />

        <Input placeholder="Outline Input" variant="outline" size="md" />

        <Input placeholder="Filled Input" variant="filled" size="md" />

        <Text size="xl" weight="bold" marginTop="$4">
          Input Sizes
        </Text>

        <Input placeholder="Small Input" variant="default" size="sm" />

        <Input placeholder="Medium Input" variant="default" size="md" />

        <Input placeholder="Large Input" variant="default" size="lg" />

        <Text size="xl" weight="bold" marginTop="$4">
          Input States
        </Text>

        <Input placeholder="Disabled Input" variant="default" size="md" disabled />

        <Input
          placeholder="With Error"
          variant="default"
          size="md"
          error="This is an error message"
        />

        <Input
          placeholder="Controlled Input"
          variant="default"
          size="md"
          value={value}
          onChangeText={setValue}
        />

        <Text size="xl" weight="bold" marginTop="$4">
          Input with Icon
        </Text>

        <Input
          placeholder="Search..."
          variant="outline"
          size="lg"
          icon={<FontAwesome name="search" size={18} color="#aaa" />}
        />

        <Input
          placeholder="Email..."
          variant="default"
          size="md"
          icon={<FontAwesome name="envelope" size={18} color="#aaa" />}
        />
      </YStack>
    </View>
  );
}
