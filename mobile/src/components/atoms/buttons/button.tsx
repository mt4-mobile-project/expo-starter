import { styled, GetProps, Theme, ThemeProps, Button as TamaguiButton } from 'tamagui';
import { forwardRef } from 'react';

// Define the variant types explicitly
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const ButtonFrame = styled(TamaguiButton, {
  name: 'Button',
  height: '$5',
  paddingHorizontal: '$4',
  borderRadius: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '$2',
  fontWeight: '700',

  // Variants
  variants: {
    variant: {
      default: {
        backgroundColor: '$primary',
        color: '$primaryForeground',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.9,
          backgroundColor: '$primary',
        },
      },
      destructive: {
        backgroundColor: '$destructive',
        color: '$destructiveForeground',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.9,
          backgroundColor: '$destructive',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: '$foreground',
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
          backgroundColor: '$secondary',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$foreground',
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
        textDecorationLine: 'underline',
        pressStyle: {
          backgroundColor: 'transparent',
          opacity: 0.6,
        },
      },
    },
    size: {
      default: {
        height: '$10', // 40px comme shadcn
        paddingHorizontal: '$4',
        fontSize: 16,
      },
      sm: {
        height: '$8', // 32px comme shadcn
        paddingHorizontal: '$3',
        fontSize: 14,
        borderRadius: '$sm',
      },
      lg: {
        height: '$12', // 48px comme shadcn
        paddingHorizontal: '$6',
        fontSize: 18,
        borderRadius: '$lg',
      },
      icon: {
        height: '$10', // 40px comme shadcn
        width: '$10',
        paddingHorizontal: 0,
        borderRadius: '$md',
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
    // Pour les variantes qui nécessitent un thème spécifique
    const themeName: ThemeProps['name'] =
      variant === 'outline' || variant === 'ghost' ? 'light' : undefined;

    // Simplification du rendu pour le variant link
    if (variant === 'link') {
      return (
        <ButtonFrame ref={ref} variant={variant as any} {...props}>
          {children}
        </ButtonFrame>
      );
    }

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
