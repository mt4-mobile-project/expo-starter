import { YStack } from 'tamagui';
import { Input } from '@/components/atoms/inputs/input';
import { Control, Controller, FieldValues, Path, DefaultValues } from 'react-hook-form';
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

interface InputGeneratorProps<T extends FieldValues> {
  control: Control<T>; // Add control prop
  configs: BaseInputConfig[];
  defaultValues: DefaultValues<T>;
}

export function InputGenerator<T extends FieldValues>({
  configs,
  defaultValues,
  control, 
}: InputGeneratorProps<T>) {
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
              icon={<MaterialCommunityIcons name={config.icon} size={20} color="#aaa"/>}
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
