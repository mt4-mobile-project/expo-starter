import { styled, Text as TText } from 'tamagui';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export const Text = styled(TText, {
  name: 'Text',
  color: '$foreground',
  fontSize: 14,
  fontWeight: '600',
  lineHeight: 16.8,
  letterSpacing: -0.3,

  variants: {
    size: {
      xs: {
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: -0.2,
      },
      sm: {
        fontSize: 14,
        lineHeight: 16.8,
        letterSpacing: -0.2,
      },
      base: {
        fontSize: 16,
        lineHeight: 19.2,
        letterSpacing: -0.3,
      },
      lg: {
        fontSize: 18,
        lineHeight: 21.6,
        letterSpacing: -0.3,
      },
      xl: {
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: -0.3,
      },
    },
    weight: {
      normal: {
        fontWeight: '400',
      },
      medium: {
        fontWeight: '500',
      },
      semibold: {
        fontWeight: '600',
      },
      bold: {
        fontWeight: '700',
      },
    },
  } as const,
  defaultVariants: {
    size: 'sm',
    weight: 'semibold',
  },
});
