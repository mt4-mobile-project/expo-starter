import { View } from 'tamagui';
import ProfileName from '@/components/atoms/profile-cards/profil-name';
import { ReactNode } from 'react';

interface ProfileCardProps {
  profileName: string;
  profileImage?: ReactNode;
}

export default function ProfileCard({ profileName, profileImage }: ProfileCardProps) {
  return (
    <View alignItems="center" justifyContent="center" padding="$4" borderRadius="$lg">
      {profileImage}

      <View marginTop="$4">
        <ProfileName name={profileName} />
      </View>
    </View>
  );
}
