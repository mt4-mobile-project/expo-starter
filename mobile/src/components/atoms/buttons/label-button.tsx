import { forwardRef } from 'react';
import { TamaguiTextElement, styled, Text, XStack } from 'tamagui';
import { GetProps } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';

// 1. On définit les variants manuellement
type LabelButtonVariant = 'default' | 'primary' | 'secondary' | 'destructive';
type LabelButtonSize = 'sm' | 'md' | 'lg';

// 2. Création du composant stylé
const StyledLabel = styled(Text, {
  name: 'LabelButton',
  fontWeight: '600',
  textDecorationLine: 'underline',
  cursor: 'pointer',

  variants: {
    variant: {
      default: { color: '$color' },
      primary: { color: '$primary' },
      secondary: { color: '$secondary' },
      destructive: { color: '$destructive' },
      muted: { color: '$gray10' },
    },
    size: {
      sm: { fontSize: 12 },
      md: { fontSize: 14 },
      lg: { fontSize: 16 },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  },

  // defaultVariants: {
  //   variant: 'default',
  //   size: 'md',
  // },

  pressStyle: {
    opacity: 0.7,
  },
});

// 3. On crée le type complet de props
type LabelButtonProps = GetProps<typeof StyledLabel> & {
  icon?: JSX.Element;
  variant?: LabelButtonVariant;
  size?: LabelButtonSize;
};

export const LabelButton = forwardRef<TamaguiTextElement, LabelButtonProps>(
  ({ children, icon, ...props }, ref) => {
    return (
      <XStack alignItems="center" gap="$1">
        <StyledLabel ref={ref} {...props}>
          {children}
        </StyledLabel>
        {icon && (
          <XStack
            alignItems="center"
            justifyContent="center"
            style={{ alignSelf: 'center', marginTop: 1 }} // petit tweak pour l’alignement
          >
            {icon}
          </XStack>
        )}
      </XStack>
    );
  }
);
LabelButton.displayName = 'LabelButton';
