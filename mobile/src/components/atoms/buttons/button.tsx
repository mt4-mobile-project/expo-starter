import { styled, GetProps, Button as TamaguiButton } from 'tamagui';
import { forwardRef } from 'react';

// Define the variant types explicitly
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const ButtonFrame = styled(TamaguiButton, {
  name: 'Button',
  minHeight: 44, // iOS standard minimum touch target
  paddingHorizontal: '$4',
  borderRadius: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '$2',
  fontWeight: '600',

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
      destructive: {
        backgroundColor: '$destructive',
        color: '$destructiveForeground',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.8,
          backgroundColor: '$destructive',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: '$primary', // Changed from $foreground to $primary for better visibility
        borderWidth: 1,
        borderColor: '$border', // Changed from $border to $primary
        pressStyle: {
          backgroundColor: '$secondary',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$primary',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.8,
        },
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$secondaryForeground',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.8,
          backgroundColor: '$secondary',
        },
      },
      link: {
        backgroundColor: 'transparent',
        color: '$primary',
        borderWidth: 0,
        height: 'auto',
        paddingHorizontal: 0,
        textDecorationLine: 'underline',
        pressStyle: {
          backgroundColor: 'transparent',
          opacity: 0.8,
        },
      },
    },
    size: {
      default: {
        height: '$10',
        paddingHorizontal: '$4',
        fontSize: 14,
      },
      sm: {
        height: '$8',
        paddingHorizontal: '$3',
        fontSize: 12,
        borderRadius: '$full',
      },
      lg: {
        height: '$12',
        paddingHorizontal: '$6',
        fontSize: 16,
        borderRadius: '$full',
      },
      icon: {
        height: '$10',
        width: '$10',
        paddingHorizontal: 0,
        borderRadius: '$full',
        justifyContent: 'center',
        alignItems: 'center',
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

export const Button = forwardRef<React.ElementRef<typeof ButtonFrame>, ButtonProps>(
  ({ children, variant = 'default', ...props }, ref) => {
    // Remove the theme override since we now handle colors through tokens
    return (
      <ButtonFrame ref={ref} variant={variant as any} {...props}>
        {children}
      </ButtonFrame>
    );
  }
);

Button.displayName = 'Button';
