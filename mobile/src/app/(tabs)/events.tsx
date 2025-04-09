import { View } from 'tamagui';
import { FormGenerator } from '@/utils/generator/input-generator';
import { REGISTER_INPUT_CONFIGS } from '@/configs/inputs/register-input.config';
import { Link } from 'expo-router';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function EventsScreen() {
  const handleRegister = (data: RegisterFormData) => {
    console.log('Register data:', data);
  };

  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
    >
      <Link
        href={{
          pathname: '/event/[id]',
          params: { id: 567890 },
        }}
      >
        View event 567890 (id in params in href)
      </Link>

      <Link
        href={{
          pathname: '/event/[id]',
          params: { id: 2 },
        }}
      >
        View event 2 (id in params in href)
      </Link>

      <Link
        href={{
          pathname: '/event/[id]',
          params: { id: 97661 },
        }}
      >
        View event 97661 (id in params in href)
      </Link>

      <Link
        href={{
          pathname: '/vitoexample',
        }}
      >
        View Vito example page
      </Link>

      <FormGenerator<RegisterFormData>
        configs={REGISTER_INPUT_CONFIGS}
        onSubmit={handleRegister}
        defaultValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
      />
    </View>
  );
}
