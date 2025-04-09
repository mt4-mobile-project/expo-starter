import { styled, GetProps, Input as TamaguiInput, XStack, YStack } from 'tamagui';
import { forwardRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '@/components/atoms/typography/text';

type InputVariant = 'default' | 'outline' | 'filled';
type InputSize = 'sm' | 'md' | 'lg';

const InputFrame = styled(TamaguiInput, {
  name: 'Input',

  backgroundColor: '$input',
  borderWidth: 1,
  borderRadius: '$lg',
  borderColor: '$borderMuted',
  paddingHorizontal: '$4',
  height: 48,
  color: '$primaryForeground',
  placeholderTextColor: '$mutedForeground',
  fontWeight: '500',
  width: '100%',

  variants: {
    variant: {
      default: {
        backgroundColor: '$input',
        borderColor: '$borderMuted',
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: '$borderMuted',
        borderWidth: 1,
      },
      filled: {
        backgroundColor: '$card',
        borderWidth: 0,
      },
    },
    size: {
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

interface InputProps extends Omit<GetProps<typeof InputFrame>, 'variant'> {
  icon?: JSX.Element;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  error?: string;
  secureTextEntry?: boolean;
  width?: string;
}

export const Input = forwardRef<React.ElementRef<typeof InputFrame>, InputProps>(
  (
    { variant = 'default', icon, size = 'md', width = '100%', error, secureTextEntry, ...props },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const paddingLeftMap: Record<InputSize, string> = {
      sm: '$6',
      md: '$7',
      lg: '$8',
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <YStack width={width}>
        <XStack position="relative" width="100%" alignItems="center">
          {icon && (
            <YStack
              position="absolute"
              left="$3"
              top={0}
              bottom={0}
              justifyContent="center"
              pointerEvents="none"
            >
              {icon}
            </YStack>
          )}
          <InputFrame
            ref={ref}
            variant={variant}
            size={size}
            paddingLeft={icon ? paddingLeftMap[size] : '$3'}
            paddingRight={secureTextEntry ? '$12' : '$4'}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            {...props}
          />
          {secureTextEntry && (
            <YStack
              position="absolute"
              right="$3"
              top={0}
              bottom={0}
              justifyContent="center"
              onPress={togglePasswordVisibility}
              cursor="pointer"
            >
              <MaterialCommunityIcons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color="$mutedForeground"
              />
            </YStack>
          )}
        </XStack>
        {error && (
          <Text color="$destructive" fontSize="$2" marginTop="$1">
            {error}
          </Text>
        )}
      </YStack>
    );
  }
);

Input.displayName = 'Input';
