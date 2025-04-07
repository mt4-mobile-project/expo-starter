import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createMedia } from '@tamagui/react-native-media-driver';
import { createTamagui } from 'tamagui';

// Create our custom font
const interFont = createInterFont();

// Define our custom colors
const lightColors = {
  primary: '#3B82F6', // Blue
  secondary: '#10B981', // Green
  background: '#FFFFFF',
  card: '#F9FAFB',
  text: '#1F2937',
  border: '#E5E7EB',
  notification: '#EF4444',
  muted: '#6B7280',
  // Add more colors as needed
};

const darkColors = {
  primary: '#60A5FA', // Lighter blue for dark mode
  secondary: '#34D399', // Lighter green for dark mode
  background: '#111827',
  card: '#1F2937',
  text: '#F9FAFB',
  border: '#374151',
  notification: '#F87171',
  muted: '#9CA3AF',
  // Add more colors as needed
};

// Create our custom themes
const customThemes = {
  light: {
    backgroundHover: lightColors.card,
    backgroundPress: lightColors.card,
    backgroundFocus: lightColors.card,
    color: lightColors.text,
    colorHover: lightColors.text,
    colorPress: lightColors.text,
    colorFocus: lightColors.text,
    borderColor: lightColors.border,
    borderColorHover: lightColors.border,
    borderColorFocus: lightColors.border,
    borderColorPress: lightColors.border,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowColorHover: 'rgba(0, 0, 0, 0.2)',
    shadowColorFocus: 'rgba(0, 0, 0, 0.2)',
    shadowColorPress: 'rgba(0, 0, 0, 0.2)',
    // Custom colors
    ...lightColors,
  },
  dark: {
    backgroundHover: darkColors.card,
    backgroundPress: darkColors.card,
    backgroundFocus: darkColors.card,
    color: darkColors.text,
    colorHover: darkColors.text,
    colorPress: darkColors.text,
    colorFocus: darkColors.text,
    borderColor: darkColors.border,
    borderColorHover: darkColors.border,
    borderColorFocus: darkColors.border,
    borderColorPress: darkColors.border,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowColorHover: 'rgba(0, 0, 0, 0.4)',
    shadowColorFocus: 'rgba(0, 0, 0, 0.4)',
    shadowColorPress: 'rgba(0, 0, 0, 0.4)',
    // Custom colors
    ...darkColors,
  },
};

// Combine with default themes
const allThemes = {
  ...themes,
  ...customThemes,
};

// Create the Tamagui config
export const tamaguiConfig = createTamagui({
  defaultFont: 'body',
  fonts: {
    body: interFont,
    heading: interFont,
  },
  tokens,
  themes: allThemes,
  shorthands,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
