import { View } from 'tamagui';
import ProfileCard from '@/components/molecules/profile-card/profil-card';
import { FormGenerator } from '@/utils/generator/input-generator';
import { PROFILE_INPUT_CONFIGS } from '@/configs/inputs/profile-input.config';
import ConfirmationButtons from '@/components/molecules/confirmation-buttons/confirmation-button';

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export default function ProfilScreen() {
  const handleSubmit = (data: ProfileFormData) => {
    console.log('Profile data:', data);
  };

  const handleCancel = () => {
    console.log('Action annulée');
  };

  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap={'$20'}
    >
      <ProfileCard />
      <FormGenerator<ProfileFormData>
        configs={PROFILE_INPUT_CONFIGS}
        onSubmit={handleSubmit}
        defaultValues={{
          fullName: '',
          email: '',
          phone: '',
          address: '',
        }}
      />
      <ConfirmationButtons
        onCancel={handleCancel}
        onSubmit={() => handleSubmit({ fullName: '', email: '', phone: '', address: '' })}
      />
    </View>
  );
}
