import { View } from 'tamagui';
import ProfileCard from '@/components/molecules/profile-card/profil-card';

export default function ProfilScreen() {
  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
    >
      <ProfileCard />
    </View>
  );
}
