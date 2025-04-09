import { View, YStack } from 'tamagui';
import { Text } from '@/components/atoms/typography/text';
import { Input } from '@/components/atoms/inputs/input';
import { Button } from '@/components/atoms/buttons/button';
import { Form } from '@/components/molecules/form/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function TemporaryFormScreen() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Form submitted:', data);
      // Handle your form submission here
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <View flex={1} backgroundColor="$background" padding="$4">
      <Form form={form} onSubmit={onSubmit}>
        <YStack space="$4">
          <Input
            placeholder="Username"
            onChangeText={(text) => form.setValue('username', text)}
            value={form.watch('username')}
            error={form.formState.errors.username?.message}
          />

          <Input
            placeholder="Email"
            onChangeText={(text) => form.setValue('email', text)}
            value={form.watch('email')}
            error={form.formState.errors.email?.message}
          />

          <Input
            placeholder="Password"
            onChangeText={(text) => form.setValue('password', text)}
            value={form.watch('password')}
            error={form.formState.errors.password?.message}
            secureTextEntry
          />

          {form.formState.errors.root?.message && (
            <Text color="$error">{form.formState.errors.root.message}</Text>
          )}

          <Button
            variant="default"
            size="lg"
            onPress={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
        </YStack>
      </Form>
    </View>
  );
}
