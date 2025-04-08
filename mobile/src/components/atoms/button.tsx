import { styled, GetProps, Theme, ThemeProps, Button as TamaguiButton, Text } from 'tamagui';
import { forwardRef } from 'react';

// Define the variant types explicitly
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const ButtonFrame = styled(TamaguiButton, {
  name: 'Button',
  height: '$5',
  paddingHorizontal: '$3',
  borderRadius: '$2',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '$2',

  // Variants
  variants: {
    variant: {
      default: {
        backgroundColor: '$primary',
        color: '$primaryForeground',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.9,
        },
      },
      destructive: {
        backgroundColor: '$destructive',
        color: '$destructiveForeground',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.9,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: '$primary',
        borderWidth: 1,
        borderColor: '$border',
        pressStyle: {
          backgroundColor: '$muted',
        },
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$secondaryForeground',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.9,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$primary',
        borderWidth: 0,
        pressStyle: {
          backgroundColor: '$muted',
        },
      },
      link: {
        backgroundColor: 'transparent',
        color: '$primary',
        borderWidth: 0,
        height: 'auto',
        paddingHorizontal: 0,
        pressStyle: {
          opacity: 0.8,
        },
      },
    },
    size: {
      default: {
        height: '$5',
        paddingHorizontal: '$3',
        fontSize: 16,
      },
      sm: {
        height: '$4',
        paddingHorizontal: '$2',
        fontSize: 14,
      },
      lg: {
        height: '$6',
        paddingHorizontal: '$4',
        fontSize: 18,
      },
      icon: {
        height: '$5',
        width: '$5',
        paddingHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const, // Add as const to ensure proper type inference

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
    // Handle link variant separately to apply text decoration
    if (variant === 'link') {
      return (
        <Theme name="light">
          <ButtonFrame ref={ref} variant={variant as any} {...props}>
            <Text textDecorationLine="underline">{children}</Text>
          </ButtonFrame>
        </Theme>
      );
    }

    // For other variants
    const themeName: ThemeProps['name'] =
      variant === 'outline' || variant === 'ghost' ? 'light' : undefined;

    return (
      <Theme name={themeName}>
        <ButtonFrame ref={ref} variant={variant as any} {...props}>
          {children}
        </ButtonFrame>
      </Theme>
    );
  }
);

Button.displayName = 'Button';
