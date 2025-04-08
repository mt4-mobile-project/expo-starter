// src/components/atoms/inputs/input.tsx
import { styled, GetProps, Input as TamaguiInput, XStack, YStack } from 'tamagui';
import { forwardRef } from 'react';

// Définition des variants
type InputVariant = 'default' | 'outline' | 'filled';
type InputSize = 'sm' | 'md' | 'lg';

const InputFrame = styled(TamaguiInput, {
  name: 'Input',

  backgroundColor: '#1c1c1e',
  borderWidth: 1,
  borderColor: '#3a3a3c',
  borderRadius: '$md',
  paddingHorizontal: '$4',
  height: 48,
  color: 'white',
  placeholderTextColor: '#aaa',
  fontWeight: '500',
  width: '100%',

  variants: {
    variant: {
      default: {
        backgroundColor: '#1c1c1e',
        borderColor: '#3a3a3c',
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: '#aaa',
        borderWidth: 2,
      },
      filled: {
        backgroundColor: '#2c2c2e',
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

// Typage des props
interface InputProps extends Omit<GetProps<typeof InputFrame>, 'variant'> {
  icon?: JSX.Element;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
}

export const Input = forwardRef<React.ElementRef<typeof InputFrame>, InputProps>(
  ({ variant = 'default', icon, size = 'md', ...props }, ref) => {
    const paddingLeftMap: Record<InputSize, string> = {
      sm: '$6',
      md: '$7',
      lg: '$8',
    };

    return (
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
          {...props}
        />
      </XStack>
    );
  }
);

Input.displayName = 'Input';
