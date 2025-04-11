import { View } from 'tamagui';
import ProfileImage from '@/components/atoms/profile-cards/profil-image';
import ProfileName from '@/components/atoms/profile-cards/profil-name';

interface ProfileCardProps {
  profileName: string;
  profileImage?: React.ReactNode;
}

export default function ProfileCard({ profileName, profileImage }: ProfileCardProps) {
  return (
    <View alignItems="center" justifyContent="center" padding="$4" borderRadius="$lg">
      <ProfileImage
        width={100}
        height={100}
        borderRadius={75}
        borderColor="transparent"
        source="https://picsum.photos/300"
      />

      <View marginTop="$4">
        <ProfileName name={profileName} /> {/* Utilise le nom de profil passé en prop */}
      </View>
    </View>
  );
}
