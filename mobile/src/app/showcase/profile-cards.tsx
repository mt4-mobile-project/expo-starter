import { View, YStack, ScrollView } from 'tamagui';
import { Text } from '@/components/atoms/typography/text';
import ProfileCard from '@/components/molecules/cards/profil-card';
import ProfileImage from '@/components/atoms/profile-cards/profil-image';
import ProfileName from '@/components/atoms/profile-cards/profil-name';
import { UserCard } from '@/components/molecules/cards/users-card';

export default function ShowcaseCardsScreen() {
  return (
    <ScrollView>
      <View flex={1} backgroundColor="$background" padding="$4">
        <YStack space="$6">
          {/* Standard Profile Card */}
          <YStack space="$4">
            <Text size="xl" weight="bold">
              Standard Profile Card
            </Text>
            <ProfileCard profileName="John Doe" />
          </YStack>

          {/* Profile Images Variations */}
          <YStack space="$4">
            <Text size="xl" weight="bold">
              Profile Images
            </Text>

            <YStack space="$2" alignItems="center">
              <ProfileImage
                width={120}
                height={120}
                borderRadius={60}
                borderWidth={3}
                borderColor="#007AFF"
                source="https://picsum.photos/200"
              />

              <ProfileImage
                width={80}
                height={80}
                borderRadius={20}
                borderWidth={2}
                borderColor="#FF2D55"
                source="https://picsum.photos/201"
              />

              <ProfileImage
                width={60}
                height={60}
                borderRadius={30}
                source="https://picsum.photos/202"
              />
            </YStack>
          </YStack>

          {/* Profile Names Variations */}
          <YStack space="$4">
            <Text size="xl" weight="bold">
              Profile Names
            </Text>

            <YStack space="$2" alignItems="center">
              <ProfileName name="John Doe" />
              <ProfileName name="Jane Smith" />
              <ProfileName name="Alex Johnson" />
            </YStack>
          </YStack>

          {/* User Cards Variations */}
          <YStack space="$4">
            <Text size="xl" weight="bold">
              User Cards
            </Text>

            <UserCard
              imageUrl="https://picsum.photos/203"
              name="Sarah Wilson"
              region="New York"
              status="Online"
            />

            <UserCard
              imageUrl="https://picsum.photos/204"
              name="Michael Brown"
              region="London"
              status="Away"
            />

            <UserCard
              imageUrl="https://picsum.photos/205"
              name="Emma Davis"
              region="Paris"
              status="Offline"
            />
          </YStack>
        </YStack>
      </View>
    </ScrollView>
  );
}
