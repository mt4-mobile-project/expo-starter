import { View } from 'tamagui';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/molecules/form/form';
import { InputGenerator } from '@/utils/generator/input-generator';
import { LOGIN_INPUT_CONFIGS } from '@/configs/inputs/login-input.config';
import { login } from '@/services/auth';
import { LoginCredentials } from '@/types/login';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/atoms/buttons/button';

export default function ShowcaseLoginScreen() {
  const form = useForm<LoginCredentials>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginCredentials) => login(data),
    onSuccess: (response) => {
      console.log('Login successful:', response);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const handleSubmit = async (data: LoginCredentials) => {
    loginMutation.mutate(data);
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
          control={form.control} // Add this line to pass the form control
        />
        <Button
          variant="default"
          size="lg"
          onPress={form.handleSubmit(handleSubmit)}
          disabled={loginMutation.isPending}
        >
          Se connecter
        </Button>
      </Form>
    </View>
  );
}
