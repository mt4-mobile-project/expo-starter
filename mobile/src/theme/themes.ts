import { themes as tamaguiThemes } from '@tamagui/themes';
import { tokens } from './tokens';

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
export const allThemes = {
  ...tamaguiThemes,
  ...customThemes,
};
