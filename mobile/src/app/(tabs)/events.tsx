import { View } from 'tamagui';
import { useForm } from 'react-hook-form';
import { InputGenerator } from '@/utils/generator/input-generator';
import { REGISTER_INPUT_CONFIGS } from '@/configs/inputs/register-input.config';
import { Link } from 'expo-router';
import { Button } from '@/components/atoms/buttons/button';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function EventsScreen() {
  const form = useForm<RegisterFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

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

      <InputGenerator<RegisterFormData>
        configs={REGISTER_INPUT_CONFIGS}
        control={form.control}
        defaultValues={form.getValues()}
      />
      <Button
        variant="default"
        size="lg"
        onPress={form.handleSubmit(handleRegister)}
        width="100%"
        marginTop="$4"
      >
        Register
      </Button>
    </View>
  );
}
