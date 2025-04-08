// src/components/atoms/inputs/input.tsx
import { styled, GetProps, Input as TamaguiInput } from 'tamagui';
import { forwardRef } from 'react';

// Définition des variants
type InputVariant = 'default' | 'outline' | 'filled';
type InputSize = 'default' | 'sm' | 'lg';

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
  /*  width: '100%', */ // dans le cas où vous voulez une taille fixe

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
      default: {
        fontSize: 16,
      },
      sm: {
        fontSize: 14,
      },
      lg: {
        fontSize: 18,
      },
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
    size: 'default',
  },
});

interface InputProps extends Omit<GetProps<typeof InputFrame>, 'variant'> {
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
}

export const Input = forwardRef<React.ElementRef<typeof InputFrame>, InputProps>(
  ({ variant = 'default', ...props }, ref) => {
    return <InputFrame ref={ref} variant={variant} {...props} />;
  }
);

Input.displayName = 'Input';
