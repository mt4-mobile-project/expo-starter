import { ZodSchema } from 'zod';
import { UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function zodForm<T extends ZodSchema>(
  schema: T,
  options?: Omit<UseFormProps<any>, 'resolver'>
): UseFormProps<any> {
  return {
    ...options,
    resolver: zodResolver(schema),
  };
}
