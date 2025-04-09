import { YStack, XStack, Separator, ScrollView } from 'tamagui';
import { Text } from '@/components/atoms/typography/text';
import { Button } from '@/components/atoms/buttons/button';
import { MaterialIcons } from '@expo/vector-icons';

export default function TemporaryButtonScreen() {
  return (
    <ScrollView flex={1} backgroundColor="$background" padding="$4">
      <YStack space="$6">
        <Text size="xl" weight="bold">
          Button Component Showcase
        </Text>

        {/* Variants */}
        <YStack space="$4">
          <Text size="lg" weight="semibold">
            Variants
          </Text>

          <YStack space="$2">
            <Text>Default</Text>
            <Button variant="default" onPress={() => console.log('Default pressed')}>
              Default Button
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Destructive</Text>
            <Button variant="destructive" onPress={() => console.log('Destructive pressed')}>
              Destructive Button
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Outline</Text>
            <Button variant="outline" onPress={() => console.log('Outline pressed')}>
              Outline Button
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Secondary</Text>
            <Button variant="secondary" onPress={() => console.log('Secondary pressed')}>
              Secondary Button
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Ghost</Text>
            <Button variant="ghost" onPress={() => console.log('Ghost pressed')}>
              Ghost Button
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Link</Text>
            <Button variant="link" onPress={() => console.log('Link pressed')}>
              Link Button
            </Button>
          </YStack>
        </YStack>

        <Separator />

        {/* Sizes */}
        <YStack space="$4">
          <Text size="lg" weight="semibold">
            Sizes
          </Text>

          <YStack space="$2">
            <Text>Small (sm)</Text>
            <Button size="sm" onPress={() => console.log('Small pressed')}>
              Small Button
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Default</Text>
            <Button size="default" onPress={() => console.log('Default size pressed')}>
              Default Size Button
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Large (lg)</Text>
            <Button size="lg" onPress={() => console.log('Large pressed')}>
              Large Button
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Icon</Text>
            <Button size="icon" onPress={() => console.log('Icon pressed')}>
              <MaterialIcons name="favorite" size={24} color="white" />
            </Button>
          </YStack>
        </YStack>

        <Separator />

        {/* States */}
        <YStack space="$4">
          <Text size="lg" weight="semibold">
            States
          </Text>

          <YStack space="$2">
            <Text>Disabled</Text>
            <Button disabled onPress={() => console.log('This should not log')}>
              Disabled Button
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>With Icon</Text>
            <Button
              onPress={() => console.log('Button with icon pressed')}
              icon={<MaterialIcons name="star" size={18} color="white" />}
            >
              Button with Icon
            </Button>
          </YStack>
        </YStack>

        <Separator />

        {/* Use Cases */}
        <YStack space="$4">
          <Text size="lg" weight="semibold">
            Common Use Cases
          </Text>

          <YStack space="$2">
            <Text>Primary Action</Text>
            <Button variant="default" size="lg" onPress={() => console.log('Primary action')}>
              Save Changes
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Secondary Action</Text>
            <Button variant="outline" onPress={() => console.log('Secondary action')}>
              Cancel
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Destructive Action</Text>
            <Button variant="destructive" onPress={() => console.log('Destructive action')}>
              Delete Account
            </Button>
          </YStack>

          <YStack space="$2">
            <Text>Button Group</Text>
            <XStack space="$2">
              <Button variant="outline" flex={1} onPress={() => console.log('Cancel')}>
                Cancel
              </Button>
              <Button variant="default" flex={1} onPress={() => console.log('Confirm')}>
                Confirm
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
