import { styled, GetProps, Button as TamaguiButton } from 'tamagui';
import { forwardRef } from 'react';

// Define the variant types explicitly
type ButtonVariant = 'default' | 'bottomless';
type ButtonSize = 'default';

const ButtonFrame = styled(TamaguiButton, {
  name: 'IconButton',
  borderRadius: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  fontWeight: '600',
  paddingHorizontal: '$2',

  variants: {
    variant: {
      default: {
        backgroundColor: '$primary',
        color: '$primaryForeground',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.8,
          backgroundColor: '$primary',
        },
      },
      bottomless: {
        backgroundColor: '',
        color: '$primaryForeground',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.8,
          backgroundColor: '$primary',
        },
      },
    },
    size: {
      default: {
        height: '$12',
        width: '$12',
        paddingHorizontal: '$2',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,

  // Default variants
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// Update the ButtonProps type with proper typing
interface ButtonProps extends Omit<GetProps<typeof ButtonFrame>, 'variant'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

export const IconButton = forwardRef<React.ElementRef<typeof ButtonFrame>, ButtonProps>(
  ({ children, variant = 'default', ...props }, ref) => {
    // Remove the theme override since we now handle colors through tokens
    return (
      <ButtonFrame ref={ref} variant={variant as any} {...props}>
        {children}
      </ButtonFrame>
    );
  }
);

IconButton.displayName = 'IconButton';
