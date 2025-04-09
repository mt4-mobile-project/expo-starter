import { ComponentProps } from 'react';
import { View } from 'tamagui';
import { UseFormReturn } from 'react-hook-form';

interface FormProps<T extends Record<string, any>>
  extends Omit<ComponentProps<typeof View>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit?: (values: T) => void;
}

export function Form<T extends Record<string, any>>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) {
  return <View {...props}>{children}</View>;
}
