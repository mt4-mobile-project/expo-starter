import { createTokens } from 'tamagui';

// Define our design tokens (shadcn style)
export const tokens = createTokens({
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
