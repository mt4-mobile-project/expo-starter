import { View, YStack, ScrollView } from 'tamagui';
import { Text } from '@/components/atoms/typography/text';
import { H1, H2, H3, H4, H5, H6 } from '@/components/atoms/typography/heading';

export default function ShowcaseScreen() {
  return (
    <ScrollView>
      <View flex={1} backgroundColor="$background" padding="$4">
        <YStack space="$6">
          {/* Headings Section */}
          <YStack space="$4">
            <Text size="xl" weight="bold">
              Headings
            </Text>

            <H1>Heading 1</H1>
            <H2>Heading 2</H2>
            <H3>Heading 3</H3>
            <H4>Heading 4</H4>
            <H5>Heading 5</H5>
            <H6>Heading 6</H6>
          </YStack>

          {/* Text Sizes Section */}
          <YStack space="$4">
            <Text size="xl" weight="bold">
              Text Sizes
            </Text>

            <Text size="xs">Extra Small Text (xs)</Text>
            <Text size="sm">Small Text (sm)</Text>
            <Text size="base">Base Text (base)</Text>
            <Text size="lg">Large Text (lg)</Text>
            <Text size="xl">Extra Large Text (xl)</Text>
          </YStack>

          {/* Text Weights Section */}
          <YStack space="$4">
            <Text size="xl" weight="bold">
              Text Weights
            </Text>

            <Text weight="normal">Normal Text Weight</Text>
            <Text weight="medium">Medium Text Weight</Text>
            <Text weight="semibold">Semibold Text Weight</Text>
            <Text weight="bold">Bold Text Weight</Text>
          </YStack>

          {/* Combined Examples */}
          <YStack space="$4">
            <Text size="xl" weight="bold">
              Combined Examples
            </Text>

            <Text size="lg" weight="bold">
              Large Bold Text
            </Text>
            <Text size="base" weight="medium">
              Base Medium Text
            </Text>
            <Text size="sm" weight="semibold">
              Small Semibold Text
            </Text>
            <Text size="xs" weight="normal">
              Extra Small Normal Text
            </Text>
          </YStack>
        </YStack>
      </View>
    </ScrollView>
  );
}
