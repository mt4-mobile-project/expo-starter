import { View, YStack } from 'tamagui';
import { useForm } from 'react-hook-form';
import { Text } from '@/components/atoms/typography/text';
import { Form } from '@/components/atoms/form/form';
import { InputGenerator } from '@/utils/generator/input-generator';
import { LOGIN_INPUT_CONFIGS } from '@/configs/inputs/login-input.config';
import { LoginCredentials } from '@/types/login';
import { Button } from '@/components/atoms/buttons/button';
import { useAuth } from '@/hooks/auth/useAuth';
import { LabelButton } from '@/components/atoms/buttons/label-button';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { login, isLoading } = useAuth();

  const handleSubmit = async (data: LoginCredentials) => {
    login(data);
  };

  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap="$8"
    >
      <Text size="xl" weight="bold">
        Connectez-vous à votre compte
      </Text>

      <Form form={form} onSubmit={handleSubmit}>
        <YStack space="$4" width="100%">
          <InputGenerator
            configs={LOGIN_INPUT_CONFIGS}
            defaultValues={form.getValues()}
            control={form.control}
          />
          <Button
            variant="default"
            size="lg"
            onPress={form.handleSubmit(handleSubmit)}
            disabled={isLoading}
          >
            Se connecter
          </Button>

          <Link href="/auth/register" asChild>
            <LabelButton variant="primary" size="md">
              Pas encore de compte ? S'inscrire
            </LabelButton>
          </Link>
        </YStack>
      </Form>
    </View>
  );
}
