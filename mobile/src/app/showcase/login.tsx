import { View } from 'tamagui';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/atoms/form/form';
import { InputGenerator } from '@/utils/generator/input-generator';
import { LOGIN_INPUT_CONFIGS } from '@/configs/inputs/login-input.config';
import { LoginCredentials } from '@/types/login';
import { Button } from '@/components/atoms/buttons/button';
import { useAuth } from '@/hooks/auth/useAuth';

export default function ShowcaseLoginScreen() {
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
      gap="$4"
    >
      <Form form={form} onSubmit={handleSubmit}>
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
      </Form>
    </View>
  );
}
