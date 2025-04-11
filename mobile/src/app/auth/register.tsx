import { View } from 'tamagui';
import { useForm } from 'react-hook-form';
import { InputGenerator } from '@/utils/generator/input-generator';
import { REGISTER_INPUT_CONFIGS } from '@/configs/inputs/register-input.config';
import { Button } from '@/components/atoms/buttons/button';
import { LabelButton } from '@/components/atoms/buttons/label-button';
import { Link } from 'expo-router';
import { Text } from '@/components/atoms/typography/text';
import { RegisterCredentials } from '@/types/register';
import { useRegister } from '@/hooks/auth/useRegister';

export default function RegisterScreen() {
  const form = useForm<RegisterCredentials>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  });

  const { register, isLoading } = useRegister();

  const handleRegister = async (data: RegisterCredentials) => {
    register(data);
  };

  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      gap="$8"
      justifyContent="center"
      alignItems="center"
    >
      <Text size="xl" weight="bold">
        Créer un nouveau compte
      </Text>
      <InputGenerator<RegisterCredentials>
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
        disabled={isLoading}
      >
        <Text>S'inscrire</Text>
      </Button>

      <Link href="/auth/login" asChild>
        <LabelButton variant="primary" size="md" marginTop="$4">
          <Text>Déjà un compte ? Se connecter</Text>
        </LabelButton>
      </Link>
    </View>
  );
}
