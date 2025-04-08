import { createTokens } from 'tamagui';

// Define our design tokens (shadcn style)
export const tokens = createTokens({
  size: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24,
    $7: 28,
    $8: 32,
    $9: 36,
    $10: 40,
    $11: 44,
    $12: 48,
    $14: 56,
    $16: 64,
    $20: 80,
    $24: 96,
    $28: 112,
    $32: 128,
    $36: 144,
    $40: 160,
    $44: 176,
    $48: 192,
    $52: 208,
    $56: 224,
    $60: 240,
    $64: 256,
    $72: 288,
    $80: 320,
    $96: 384,
    // Add the $true key as required by Tamagui
    $true: 16, // Setting $4 (16) as the default size
  },
  space: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24,
    $7: 28,
    $8: 32,
    $9: 36,
    $10: 40,
    $11: 44,
    $12: 48,
    $14: 56,
    $16: 64,
    $20: 80,
    $24: 96,
    $28: 112,
    $32: 128,
    $36: 144,
    $40: 160,
    $44: 176,
    $48: 192,
    $52: 208,
    $56: 224,
    $60: 240,
    $64: 256,
    $72: 288,
    $80: 320,
    $96: 384,
    // Add the $true key as required by Tamagui
    $true: 16, // Setting $4 (16) as the default space
  },
  radius: {
    $none: 0,
    $xs: 2,
    $sm: 4,
    $md: 8,
    $lg: 12,
    $xl: 16,
    $2xl: 24,
    $3xl: 32,
    $full: 9999,

    $true: 8, // Setting $md (8) as the default radius
  },
  zIndex: {
    $auto: 'auto',
    $0: 0,
    $10: 10,
    $20: 20,
    $30: 30,
    $40: 40,
    $50: 50,
    $drawer: 30,
    $modal: 40,
    $popover: 50,
    $tooltip: 60,
    $toast: 70,
    $overlay: 100,
    $true: 0, // Default zIndex
  },
  // Mise à jour des tokens de couleur avec les valeurs OKLCH
  // Je vais mettre à jour vos tokens de couleur pour utiliser les valeurs OKLCH fournies, qui correspondent au style de shadcn/ui.
  color: {
    // Base colors
    white: '#FFFFFF',
    black: '#171717',

    // Semantic colors (shadcn style)
    background: '#FFFFFF',
    foreground: '#171717',

    card: '#FFFFFF',
    cardForeground: '#171717',

    popover: '#FFFFFF',
    popoverForeground: '#171717',

    // Brand colors
    primary: '#262626',
    primaryForeground: '#FAFAFA',

    secondary: '#F5F5F5',
    secondaryForeground: '#262626',

    muted: '#F5F5F5',
    mutedForeground: '#737373',

    accent: '#F5F5F5',
    accentForeground: '#262626',

    destructive: '#EF4444',
    destructiveForeground: '#FAFAFA',

    success: '#22C55E',
    successForeground: '#FAFAFA',

    warning: '#F59E0B',
    warningForeground: '#171717',

    info: '#3B82F6',
    infoForeground: '#FAFAFA',

    // UI elements
    border: '#E5E5E5',
    input: '#E5E5E5',
    ring: '#A3A3A3',

    // Chart colors
    chart1: '#22C55E',
    chart2: '#3B82F6',
    chart3: '#6366F1',
    chart4: '#F59E0B',
    chart5: '#EF4444',

    // Sidebar
    sidebar: '#FAFAFA',
    sidebarForeground: '#171717',
    sidebarPrimary: '#262626',
    sidebarPrimaryForeground: '#FAFAFA',
    sidebarAccent: '#F5F5F5',
    sidebarAccentForeground: '#262626',
    sidebarBorder: '#E5E5E5',
    sidebarRing: '#A3A3A3',

    // Dark mode variants
    backgroundDark: '#171717',
    foregroundDark: '#FAFAFA',

    cardDark: '#262626',
    cardForegroundDark: '#FAFAFA',

    popoverDark: '#404040',
    popoverForegroundDark: '#FAFAFA',

    primaryDark: '#E5E5E5',
    primaryForegroundDark: '#262626',

    secondaryDark: '#404040',
    secondaryForegroundDark: '#FAFAFA',

    mutedDark: '#404040',
    mutedForegroundDark: '#A3A3A3',

    accentDark: '#525252',
    accentForegroundDark: '#FAFAFA',

    destructiveDark: '#F87171',
    destructiveForegroundDark: '#FAFAFA',

    successDark: '#8B5CF6',
    successForegroundDark: '#FAFAFA',

    warningDark: '#EF4444',
    warningForegroundDark: '#171717',

    infoDark: '#38BDF8',
    infoForegroundDark: '#FAFAFA',

    borderDark: 'rgba(255, 255, 255, 0.1)',
    inputDark: 'rgba(255, 255, 255, 0.15)',
    ringDark: '#737373',

    // Chart colors (dark)
    chart1Dark: '#8B5CF6',
    chart2Dark: '#38BDF8',
    chart3Dark: '#EF4444',
    chart4Dark: '#D946EF',
    chart5Dark: '#F97316',

    // Sidebar (dark)
    sidebarDark: '#262626',
    sidebarForegroundDark: '#FAFAFA',
    sidebarPrimaryDark: '#8B5CF6',
    sidebarPrimaryForegroundDark: '#FAFAFA',
    sidebarAccentDark: '#404040',
    sidebarAccentForegroundDark: '#FAFAFA',
    sidebarBorderDark: 'rgba(255, 255, 255, 0.1)',
    sidebarRingDark: '#606060',
  },
});
