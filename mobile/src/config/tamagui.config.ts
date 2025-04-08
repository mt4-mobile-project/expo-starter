import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes } from '@tamagui/themes';
import { createMedia } from '@tamagui/react-native-media-driver';
import { createTamagui, createTokens } from 'tamagui';

// Create our custom font
const interFont = createInterFont();

// Define our design tokens (shadcn style)
const tokens = createTokens({
  size: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 24,
    $5: 32,
    $6: 40,
    $7: 48,
    $8: 56,
    $9: 64,
    $10: 72,
    // Add the $true key as required by Tamagui
    $true: 16, // Setting $3 (16) as the default size
  },
  space: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 24,
    $5: 32,
    $6: 40,
    $7: 48,
    $8: 56,
    $9: 64,
    $10: 72,
    // Add the $true key as required by Tamagui
    $true: 16, // Setting $3 (16) as the default space
  },
  radius: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 24,
    $full: 9999,
    // Add the $true key as required by Tamagui
    $true: 8, // Setting $2 (8) as the default radius
  },
  zIndex: {
    $0: 0,
    $1: 100,
    $2: 200,
    $3: 300,
    $4: 400,
    $5: 500,
    // Add the $true key as required by Tamagui
    $true: 0, // Setting $0 (0) as the default zIndex
  },
  color: {
    // Base colors
    white: '#FFFFFF',
    black: '#000000',

    // Light mode
    background: '#FFFFFF',
    foreground: '#1F2937',
    card: '#F9FAFB',
    cardForeground: '#1F2937',
    popover: '#FFFFFF',
    popoverForeground: '#1F2937',
    primary: '#3B82F6',
    primaryForeground: '#FFFFFF',
    secondary: '#10B981',
    secondaryForeground: '#FFFFFF',
    muted: '#F3F4F6',
    mutedForeground: '#6B7280',
    accent: '#F9FAFB',
    accentForeground: '#1F2937',
    destructive: '#EF4444',
    destructiveForeground: '#FFFFFF',
    border: '#E5E7EB',
    input: '#E5E7EB',
    ring: '#3B82F6',

    // Dark mode
    backgroundDark: '#111827',
    foregroundDark: '#F9FAFB',
    cardDark: '#1F2937',
    cardForegroundDark: '#F9FAFB',
    popoverDark: '#1F2937',
    popoverForegroundDark: '#F9FAFB',
    primaryDark: '#60A5FA',
    primaryForegroundDark: '#FFFFFF',
    secondaryDark: '#34D399',
    secondaryForegroundDark: '#FFFFFF',
    mutedDark: '#374151',
    mutedForegroundDark: '#9CA3AF',
    accentDark: '#1F2937',
    accentForegroundDark: '#F9FAFB',
    destructiveDark: '#F87171',
    destructiveForegroundDark: '#FFFFFF',
    borderDark: '#374151',
    inputDark: '#374151',
    ringDark: '#60A5FA',
  },
});

// Create our custom themes (shadcn style)
const customThemes = {
  light: {
    background: tokens.color.background,
    color: tokens.color.foreground,

    // Card
    card: tokens.color.card,
    cardForeground: tokens.color.cardForeground,

    // Popover
    popover: tokens.color.popover,
    popoverForeground: tokens.color.popoverForeground,

    // Primary
    primary: tokens.color.primary,
    primaryForeground: tokens.color.primaryForeground,

    // Secondary
    secondary: tokens.color.secondary,
    secondaryForeground: tokens.color.secondaryForeground,

    // Muted
    muted: tokens.color.muted,
    mutedForeground: tokens.color.mutedForeground,

    // Accent
    accent: tokens.color.accent,
    accentForeground: tokens.color.accentForeground,

    // Destructive
    destructive: tokens.color.destructive,
    destructiveForeground: tokens.color.destructiveForeground,

    // Border
    border: tokens.color.border,
    input: tokens.color.input,
    ring: tokens.color.ring,

    // Hover states
    backgroundHover: tokens.color.card,
    backgroundPress: tokens.color.card,
    backgroundFocus: tokens.color.card,
    colorHover: tokens.color.foreground,
    colorPress: tokens.color.foreground,
    colorFocus: tokens.color.foreground,
    borderColorHover: tokens.color.border,
    borderColorFocus: tokens.color.border,
    borderColorPress: tokens.color.border,

    // Shadow
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowColorHover: 'rgba(0, 0, 0, 0.2)',
    shadowColorFocus: 'rgba(0, 0, 0, 0.2)',
    shadowColorPress: 'rgba(0, 0, 0, 0.2)',
  },
  dark: {
    background: tokens.color.backgroundDark,
    color: tokens.color.foregroundDark,

    // Card
    card: tokens.color.cardDark,
    cardForeground: tokens.color.cardForegroundDark,

    // Popover
    popover: tokens.color.popoverDark,
    popoverForeground: tokens.color.popoverForegroundDark,

    // Primary
    primary: tokens.color.primaryDark,
    primaryForeground: tokens.color.primaryForegroundDark,

    // Secondary
    secondary: tokens.color.secondaryDark,
    secondaryForeground: tokens.color.secondaryForegroundDark,

    // Muted
    muted: tokens.color.mutedDark,
    mutedForeground: tokens.color.mutedForegroundDark,

    // Accent
    accent: tokens.color.accentDark,
    accentForeground: tokens.color.accentForegroundDark,

    // Destructive
    destructive: tokens.color.destructiveDark,
    destructiveForeground: tokens.color.destructiveForegroundDark,

    // Border
    border: tokens.color.borderDark,
    input: tokens.color.inputDark,
    ring: tokens.color.ringDark,

    // Hover states
    backgroundHover: tokens.color.cardDark,
    backgroundPress: tokens.color.cardDark,
    backgroundFocus: tokens.color.cardDark,
    colorHover: tokens.color.foregroundDark,
    colorPress: tokens.color.foregroundDark,
    colorFocus: tokens.color.foregroundDark,
    borderColorHover: tokens.color.borderDark,
    borderColorFocus: tokens.color.borderDark,
    borderColorPress: tokens.color.borderDark,

    // Shadow
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowColorHover: 'rgba(0, 0, 0, 0.4)',
    shadowColorFocus: 'rgba(0, 0, 0, 0.4)',
    shadowColorPress: 'rgba(0, 0, 0, 0.4)',
  },
};

// Combine with default themes
const allThemes = {
  ...themes,
  ...customThemes,
};

// Create the Tamagui config
const config = createTamagui({
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

// Export the config directly as default
export default config;

// For type safety
export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
