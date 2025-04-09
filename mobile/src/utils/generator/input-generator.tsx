import { YStack } from 'tamagui';
import { Input } from '@/components/atoms/inputs/input';
import { useForm, Controller, FieldValues, Path, DefaultValues } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface BaseInputConfig {
  name: string;
  placeholder: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  variant?: 'default' | 'outline' | 'filled';
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences';
  secureTextEntry?: boolean;
  validation?: {
    required?: string;
    minLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
}

interface FormGeneratorProps<T extends FieldValues> {
  onSubmit?: (data: T) => void;
  configs: BaseInputConfig[];
  defaultValues: DefaultValues<T>;
}

export function FormGenerator<T extends FieldValues>({ 
  onSubmit, 
  configs,
  defaultValues 
}: FormGeneratorProps<T>) {
  const { control, handleSubmit } = useForm<T>({
    defaultValues
  });

  const onSubmitForm = handleSubmit((data: T) => {
    onSubmit?.(data);
  });

  return (
    <YStack space="$4" width="100%">
      {configs.map((config) => (
        <Controller
          key={config.name}
          control={control}
          name={config.name as Path<T>}
          rules={config.validation}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              placeholder={config.placeholder}
              icon={<MaterialCommunityIcons name={config.icon} size={20} color="#aaa" />}
              variant={config.variant}
              value={value}
              onChangeText={onChange}
              keyboardType={config.keyboardType}
              autoCapitalize={config.autoCapitalize}
              secureTextEntry={config.secureTextEntry}
              paddingLeft="$10"
              error={error?.message}
            />
          )}
        />
      ))}
    </YStack>
  );
}